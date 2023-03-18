import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { HttpError } from 'http-error-classes';
import { auth } from 'express-openid-connect';
import { config } from './config/config';
import Logging from './library/logging';
import basicRoutes from './routes/basicRoutes';
import dishRoutes from './routes/dishRoutes';
import userRoutes from './routes/user/userRoutes';
import AUTH_CONFIG from './config/authConfig';
// import { OpenidRequest } from 'express-openid-connect';
import { swaggerSpec } from './config/swaggerConfig';

// eslint-disable-next-line @typescript-eslint/no-require-imports

const router = express();

// Authentication Config
router.use(
  auth(AUTH_CONFIG),
);

// Swagger Config
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Mongo connected successfully.');
    StartServer();
  })
  .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = (): void => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /** Log the res */
      Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** API Rules */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */

  router.use('/', basicRoutes);
  router.use('/users', userRoutes);
  router.use('/dishes', dishRoutes);

  /** Error handling */
  /* router.use((req, res, next) => {
        const error = new Error('Unimplemented');

        Logging.error(error);

        res.status(501).json({
            message: error.message
        });
    }); */
  router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
      // or
      // res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send('Unknown Server Error');
    }

    // do your logic
    Logging.error(error);
    Logging.info(`Parameters: ${req.params}. `/* User data: ${req.user}` */);
  });

  http.createServer(router).listen(config.server.port, () => {
    Logging.info(`Server is running on port ${config.server.port}`);
    // swaggerDocs(router, config.server.port);
  });
};
