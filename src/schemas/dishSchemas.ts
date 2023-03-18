import {
  object, string, array, TypeOf,
} from 'zod';
import { createRecipeBody } from './recipeSchemas';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateDishRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          required: true
 *        description:
 *          type: string
 *          default: ''
 *        recipes:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateRecipeRequest'
 *    DishResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        recipes:
 *          type: array
 *          items:
 *            type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createDishBody = object({
  title: string({
    required_error: 'Title is required',
  }),
  description: string().default('').optional(),
  recipes: array(createRecipeBody).nonempty(),
});

export type CreateDishRequestBody = TypeOf<typeof createDishBody>;
// export type CreateDishRequest = TypeOf<typeof createDishBody>;

export const dishParams = object({
  dishId: string({
    required_error: 'dish id is required',
  }),
});

export const getDishSchema = object({
  params: dishParams,
});

export type DishParams = TypeOf<typeof dishParams>;
export type ReadDishRequest = TypeOf<typeof getDishSchema>;
// https://github.com/TomDoesTech/REST-API-Tutorial-Updated/blob/main/src/schema/product.schema.ts

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateDishRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 */
// Make this include title and desc but NOT varients
