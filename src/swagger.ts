



// CURRENTLY UNUSED

/* 
To DO:

https://github.com/Surnet/swagger-jsdoc

https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do#:~:text=To%20create%20a%20Swagger%20UI%20page%20for%20your%20Express%20API,%2F%2F%20app.

auto gen:
https://www.youtube.com/watch?v=5aryMKiBEKY
*/



import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import log from "./library/logging";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Chef API for cooking up dishes',
      description:
      'Chef Cooks up Dishes and Serves them out.',
      version: "1.0.0",
    },

    servers: [
    {
      url: 'http://localhost:9090',
      description: 'Local server',
    },
  ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;