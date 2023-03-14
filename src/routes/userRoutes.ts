import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { requiresAuth } from 'express-openid-connect';
import favoriteVariantsController from '../controllers/favoriteVariants';
// import usersController from '../controllers/usersController';
import userMay from '../middleware/authorization';

const router = express.Router();

/**
 * @swagger
 * '/users/me/favoriteVariants':
 *    get:
 *      tags:
 *      - FavoriteVariants
 *      description: Get all of a user's favorite variant ids
 *      responses:
 *        200:
 *          description: Retrieved Favorite Variants
 *          content:
 *            application/json:
 *              schema:
 *                type: Array<string>
 */
// router.get('/me', [requiresAuth(), userMay(['read:appMetaData'])], usersController.readUser);

/**
 * @swagger
 * '/users/me/favoriteVariants':
 *  post:
 *    tags:
 *    - FavoriteVariants
 *    description: Link a favorite variant for a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: string
 *            example: ouj7fbgs66dkfhs4
 *    responses:
 *      201:
 *        description: Success
 */
// router.post('/', validateRequest({ body: createRecipeBody }), controller.createRecipe);

/**
 * @swagger
 * '/users/me/favoriteVariants':
 *    get:
 *      tags:
 *      - FavoriteVariants
 *      description: Get all of a user's favorite variant ids
 *      responses:
 *        200:
 *          description: Retrieved Variants
 *          content:
 *            application/json:
 *              schema:
 *                type: Array
 *                example: ['89nkg97fgbf9', 'dkfbdf78bfb88']
 */
router.get('/me/favoriteVariants', requiresAuth(), favoriteVariantsController.readMyFavoriteVariants);
/**
 * @swagger
 * '/favoriteVariants/{id}':
 *    delete:
 *      tags:
 *      - FavoriteVariants
 *      description: Delete the link for a favorite variant by id
 *      parameters:
 *        - in: path
 *          name: variantId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      responses:
 *        204:
 *          description: Deleted and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: jdfbdfi38fh47bizdfd89
 */
// router.delete('/:recipeId', controller.deleteRecipe);

export = router;

