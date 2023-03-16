import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import favoriteVariantsController from '../../../controllers/favoriteVariantsController';

const router = express.Router();

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
 *            $ref: '#/components/schemas/CreateFavoriteVariantRequest'
 *    responses:
 *      201:
 *        description: Success
 */
router.post('/me/favoriteVariants', favoriteVariantsController.createFavoriteVariant);

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
 * '/users/me/favoriteVariants/{variantId}':
 *    delete:
 *      tags:
 *      - FavoriteVariants
 *      description: Delete the link for a favorite variant by id
 *      parameters:
 *        - in: path
 *          name: variantId
 *          type: string
 *          required: true
 *          description: linked variantId
 *      responses:
 *        204:
 *          description: Deleted and Retrieved
 */
router.delete('/me/favoriteVariants/:variantId', favoriteVariantsController.deleteFavoriteVariant);

export = router;
