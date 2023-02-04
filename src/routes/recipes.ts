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
 *    summary: Create a Recipe
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
// router.get('/get', controller.readAll);
// router.patch('/update/:authorId', controller.updateAuthor);
// router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;
