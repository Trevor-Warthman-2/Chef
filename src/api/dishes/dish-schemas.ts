import {
  object, string, array, TypeOf,
} from 'zod';
import { createRecipeBodySchema, recipeSearchFilters } from '../recipes/recipe-schemas';

/*
Example Zod:
https://github.com/TomDoesTech/REST-API-Tutorial-Updated/blob/main/src/schema/product.schema.ts
*/

const dishIdParam = object({
  dishId: string({
    required_error: 'dish id is required',
  }),
});

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

export const createDishBodySchema = object({
  title: string({
    required_error: 'Title is required',
  }),
  description: string().default('').optional(),
  recipes: array(createRecipeBodySchema).nonempty(),
});

export type CreateDishRequestBodyShape = TypeOf<typeof createDishBodySchema>;
export type CreateDishRequestShape = CreateDishRequestBodyShape;

// export const getDishSchema = object({
//   params: dishIdParam,
// });
export const showDishParamsSchema = dishIdParam;
export type ShowDishRequestParamShape = TypeOf<typeof showDishParamsSchema>;
export type ShowDishRequestShape = ShowDishRequestParamShape;

// export const indexDishParamsSchema = dishIdParam;
// export type IndexDishRequestParamShape = TypeOf<typeof showDishParamsSchema>;
export const indexDishesQuerySchema = object({});
export type IndexDishesRequestShape = TypeOf<typeof indexDishesQuerySchema>;

export const indexMyDishesQuerySchema = object({});
export type indexMyDishesRequestShape = TypeOf<typeof indexDishesQuerySchema>;

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

export const updateDishParamsSchema = dishIdParam;
export type UpdateDishRequestParamShape = TypeOf<typeof updateDishParamsSchema>;
export type UpdateDishRequestShape = UpdateDishRequestParamShape;

export const deleteDishParamsSchema = dishIdParam;
export type DeleteDishRequestParamShape = TypeOf<typeof deleteDishParamsSchema>;
export type DeleteDishRequestShape = DeleteDishRequestParamShape;

export const indexDishRecipesParamsSchema = dishIdParam;
export const indexDishRecipesQuerySchema = recipeSearchFilters;
type IndexDishRecipesRequestParamShape = TypeOf<typeof indexDishRecipesParamsSchema>;
type IndexDishRecipesRequestQueryShape = TypeOf<typeof indexDishRecipesQuerySchema>
export type IndexDishRecipesRequestShape = IndexDishRecipesRequestParamShape & IndexDishRecipesRequestQueryShape;
