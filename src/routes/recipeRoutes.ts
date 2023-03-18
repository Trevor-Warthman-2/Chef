import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import recipesController from '../controllers/recipesController';
import { createRecipeBody, recipeParams } from '../schemas/recipeSchemas';
import variantsController from '../controllers/variantsController';

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
router.post('/', validateRequest({ body: createRecipeBody }), recipesController.createRecipe);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    get:
 *      tags:
 *      - Recipes
 *      description: Get a recipe by id
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
router.get('/:recipeId', validateRequest({ params: recipeParams }), recipesController.readRecipe);

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
router.get('/', recipesController.readAllRecipes);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    patch:
 *      tags:
 *      - Recipes
 *      description: Update a recipe
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
 *          description: Updated and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RecipeResponse'
 *        304:
 *          description: Not updated
 */
router.patch('/:recipeId', recipesController.updateRecipe);

/**
 * @swagger
 * '/recipes/{recipeId}':
 *    delete:
 *      tags:
 *      - Recipes
 *      description: Delete a recipe
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
router.delete('/:recipeId', recipesController.deleteRecipe);

/**
 * @swagger
 * '/recipes/{recipeId}/variants':
 *  post:
 *    tags:
 *    - Variants
 *    description: Create a Recipe Variant
 *    parameters:
 *      - in: path
 *        name: recipeId
 *        type: string
 *        required: true
 *        description: mongo user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateVariantRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VariantResponse'
 *      404:
 *        description: recipeId not found
 */
router.post('/:recipeId/variants', variantsController.createVariant);

/**
 * @swagger
 * '/recipes/variants/{variantId}':
 *    delete:
 *      tags:
 *      - Variants
 *      description: Delete a recipe's variant
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
 *                $ref: '#/components/schemas/VariantResponse'
 */
router.delete('/variants/:variantId', variantsController.deleteVariant);

export = router;
