import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import favoriteRecipesController from '../../favorite-recipes/favorite-recipes-controller';

const router = express.Router();

/**
 * @swagger
 * '/users/me/favoriteRecipes':
 *  post:
 *    tags:
 *    - FavoriteRecipes
 *    description: Link a favorite recipe for a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateFavoriteRecipeRequest'
 *    responses:
 *      201:
 *        description: Success
 */
router.post('/me/favoriteRecipes', favoriteRecipesController.createFavoriteRecipe);

/**
 * @swagger
 * '/users/me/favoriteRecipes':
 *    get:
 *      tags:
 *      - FavoriteRecipes
 *      description: Get all of a user's favorite recipe ids
 *      responses:
 *        200:
 *          description: Retrieved Recipes
 *          content:
 *            application/json:
 *              schema:
 *                type: Array
 *                example: ['89nkg97fgbf9', 'dkfbdf78bfb88']
 */
router.get('/me/favoriteRecipes', requiresAuth(), favoriteRecipesController.readMyFavoriteRecipes);
/**
 * @swagger
 * '/users/me/favoriteRecipes/{recipeId}':
 *    delete:
 *      tags:
 *      - FavoriteRecipes
 *      description: Delete the link for a favorite recipe by id
 *      parameters:
 *        - in: path
 *          name: recipeId
 *          type: string
 *          required: true
 *          description: linked recipeId
 *      responses:
 *        204:
 *          description: Deleted and Retrieved
 */
router.delete('/me/favoriteRecipes/:recipeId', favoriteRecipesController.deleteFavoriteRecipe);

export = router;
