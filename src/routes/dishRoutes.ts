import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import dishesController from '../controllers/dishesController';
import { createDishBody, dishParams } from '../schemas/dishSchemas';
import recipesController from '../controllers/recipesController';

const router = express.Router();
/**
 * @swagger
 * '/dishes':
 *  post:
 *    tags:
 *    - Dishes
 *    description: Create a Dish
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateDishRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DishResponse'
 */
router.post('/', validateRequest({ body: createDishBody }), dishesController.createDish);

/**
 * @swagger
 * '/dishes/{dishId}':
 *    get:
 *      tags:
 *      - Dishes
 *      description: Get a dish by id
 *      parameters:
 *        - in: path
 *          name: dishId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      responses:
 *        200:
 *          description: Retrieved Dish
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DishResponse'
 */
router.get('/:dishId', validateRequest({ params: dishParams }), dishesController.readDish);

/**
 * @swagger
 * '/dishes':
 *    get:
 *      tags:
 *      - Dishes
 *      description: Get Dishes
 *      responses:
 *        200:
 *          description: Retrieved Dish
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DishResponse'
 */
router.get('/', dishesController.readAllDishes);

/**
 * @swagger
 * '/dishes/{dishId}':
 *    patch:
 *      tags:
 *      - Dishes
 *      description: Update a dish
 *      parameters:
 *        - in: path
 *          name: dishId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateDishRequest"
 *      responses:
 *        200:
 *          description: Updated and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DishResponse'
 *        304:
 *          description: Not updated
 */
router.patch('/:dishId', dishesController.updateDish);

/**
 * @swagger
 * '/dishes/{dishId}':
 *    delete:
 *      tags:
 *      - Dishes
 *      description: Delete a dish
 *      parameters:
 *        - in: path
 *          name: dishId
 *          type: string
 *          required: true
 *          description: mongo user id
 *      responses:
 *        204:
 *          description: Deleted and Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DishResponse'
 */
router.delete('/:dishId', dishesController.deleteDish);

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
router.post('/:dishId/recipes', recipesController.createRecipe);

/**
 * @swagger
 * '/dishes/recipes/{recipeId}':
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
router.delete('/recipes/:recipeId', recipesController.deleteRecipe);

export = router;
