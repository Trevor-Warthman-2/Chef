import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import recipesController from '../controllers/recipesController';
import {
  createRecipeBodySchema, createRecipeParamsSchema, deleteRecipeParamsSchema, indexRecipesQuerySchema, showRecipeParamsSchema, updateRecipeParamsSchema,
} from '../schemas/recipeSchemas';
import { requireAuthenticated } from '../middleware/authentication';

const router = express.Router();
/**
 * @swagger
 * '/dishes/{dishId}/recipes':
 *  post:
 *    tags:
 *    - Recipes
 *    description: Create a Dish Recipe
 *    parameters:
 *      - in: path
 *        name: dishId
 *        type: string
 *        required: true
 *        description: mongo user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateRecipeRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      404:
 *        description: dishId not found
 */
router.post('/dishes/:dishId/recipes', validateRequest({ params: createRecipeParamsSchema, body: createRecipeBodySchema }), recipesController.createRecipe);

/**
 * @swagger
 * '/recipes':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get or filter Recipes
 *      parameters:
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *      - in: query
 *        name: titleContains
 *        schema:
 *          type: string
 *      - in: query
 *        name: dishId
 *        schema:
 *          type: string
 *      responses:
 *        200:
 *          description: Retrieved Recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.get('/recipes', validateRequest({ query: indexRecipesQuerySchema }), recipesController.indexRecipes);

/**
 * @swagger
 * '/recipes/mine':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get or filter my Recipes
 *      parameters:
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *      - in: query
 *        name: titleContains
 *        schema:
 *          type: string
 *      - in: query
 *        name: dishId
 *        schema:
 *          type: string
 *      responses:
 *        200:
 *          description: Retrieved Recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.get('/recipes/mine', requireAuthenticated(), validateRequest({ query: indexRecipesQuerySchema }), recipesController.indexMyRecipes);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get a Recipe by id
 *      parameters:
 *        - in: path
 *          name: recipeId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      responses:
 *        200:
 *          description: Retrieved Recipe
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.get('/recipes/:recipeId', validateRequest({ params: showRecipeParamsSchema }), recipesController.showRecipe);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    patch:
 *      tags:
 *      - Recipes
 *      description: Update a Recipe
 *      parameters:
 *        - in: path
 *          name: recipeId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateRecipeRequest"
 *      responses:
 *        200:
 *          description: Updated and Retrieved Recipe
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 *        304:
 *          description: Not updated
 */
router.patch('/recipes/:recipeId', validateRequest({ params: updateRecipeParamsSchema }), recipesController.updateRecipe);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    delete:
 *      tags:
 *      - Recipes
 *      description: Delete a dish's recipe
 *      parameters:
 *        - in: path
 *          name: recipeId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      responses:
 *        204:
 *          description: Deleted and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.delete('/recipes/:recipeId', validateRequest({ params: deleteRecipeParamsSchema }), recipesController.deleteRecipe);

export = router;
