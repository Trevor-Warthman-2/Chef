import express from 'express';
import { requiresAuth } from 'express-openid-connect';

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Checks if user is Authenticated
 *    tags:
 *      - Auth
 */
router.get('/', (req, res) => {
  const { oidc }: any = req; // Logic to prevent Typescript Erroring about OpenIdConnect's badly documented ts type OpenIdRequest. See: https://github.com/auth0/express-openid-connect/blob/master/index.d.ts

  const status = oidc?.isAuthenticated() ? 'Logged In' : 'Logged Out';
  res.status(200).send(JSON.stringify(status));
});

/**
 * @openapi
 * components:
 *  schemas:
 *    AuthProfileResponse:
 *      type: object
 *      properties:
 *        given_name:
 *          type: string
 *        family_name:
 *          type: string
 *        nickname:
 *          type: string
 *        name:
 *          type: string
 *        picture:
 *          type: string
 *        locale:
 *          type: string
 *        email:
 *          type: string
 *        email_verified:
 *          type: boolean
 *        sub:
 *          type: string
 *        sid:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @swagger
 * '/profile':
 *    get:
 *      tags:
 *      - Auth
 *      description: Get user info
 *      responses:
 *        200:
 *          description: Retrieved User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthProfileResponse'
 */
router.get('/profile', requiresAuth(), (req, res) => {
  const { oidc }: any = req;
  res.send(JSON.stringify(oidc.user));
});

/**
 * @swagger
 * /and-his-name-is:
 *   get:
 *     description: Are you ready?
 *     responses:
 *       200:
 *         description: to see him this Sunday Night?!
 */
router.get('/and-his-name-is', (req, res) => {
  const data = {
    message: 'JOHN CENA!!!',
    uptime: process.uptime(),
    date: new Date(),
  };

  res.status(200).send(data);
});
export = router;
