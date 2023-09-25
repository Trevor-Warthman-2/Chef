// import Request from 'express';
// import OpenIdRequest from 'express-openid-connect';

/**
 * @swagger
 * /login:
 *  get:
 *    summary: Don't try it out in Swagger
 *    description: Allows user to authenticate using Auth0
 *    tags:
 *      - Auth
 */

/**
 * @swagger
 * /logout:
 *  get:
 *    summary: Don't try it out in Swagger
 *    description: Logs user out of Auth0
 *    tags:
 *      - Auth
 */

const AUTH_CONFIG = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

export const auth0ManagementApiBaseUrl = process.env.AUTH0_MANAGEMENT_API_BASE_URL;

export interface OIDRequest extends Request {
  oidc: any;
}

export default AUTH_CONFIG;
