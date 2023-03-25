import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import dishesController from '../controllers/dishesController';
import {
  createDishBodySchema, createDishParamsSchema, deleteDishParamsSchema, indexDishesQuerySchema, showDishParamsSchema, updateDishParamsSchema,
} from '../schemas/dishSchemas';

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
router.post('/', validateRequest({ params: createDishParamsSchema, body: createDishBodySchema }), dishesController.createDish);

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
router.get('/:dishId', validateRequest({ params: showDishParamsSchema }), dishesController.showDish);

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
router.get('/', validateRequest({ query: indexDishesQuerySchema }), dishesController.indexDishes);

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
router.patch('/:dishId', validateRequest({ params: updateDishParamsSchema }), dishesController.updateDish);

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
router.delete('/:dishId', validateRequest({ params: deleteDishParamsSchema }), dishesController.deleteDish);

export = router;
