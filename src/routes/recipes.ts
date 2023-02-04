import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import controller from '../controllers/recipesController';
import { createRecipeBody, recipeParams } from '../schemas/recipeSchemas';

const router = express.Router();
/**
 * @swagger
 * '/recipes':
 *  post:
 *    tags:
 *    - Recipes
 *    description: Create a Recipe
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
 */
router.post('/', validateRequest({ body: createRecipeBody }), controller.createRecipe);

/**
 * @swagger
 * '/recipes/{id}':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get a recipe by id
 *      parameters:
 *        - in: path
 *          name: id
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
router.get('/:id', validateRequest({ params: recipeParams }), controller.readRecipe);

/**
 * @swagger
 * '/recipes':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get Recipes
 *      responses:
 *        200:
 *          description: Retrieved Recipe
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.get('/', controller.readAllRecipes);

/**
 * @swagger
 * '/recipes/{id}':
 *    patch:
 *      tags:
 *      - Recipes
 *      description: Update a recipe
 *      parameters:
 *        - in: path
 *          name: id
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
 *          description: Updated and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 *        304:
 *          description: Not updated
 */
router.patch('/:id', controller.updateRecipe);

/**
 * @swagger
 * '/recipes/{id}':
 *    delete:
 *      tags:
 *      - Recipes
 *      description: Delete a recipe
 *      parameters:
 *        - in: path
 *          name: id
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
router.delete('/:id', controller.deleteRecipe);

export = router;
