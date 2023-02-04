import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRecipeRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *          default: ''
 *    RecipeResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createRecipeBody = object({
  title: string({
    required_error: 'Title is required',
  }),
  description: string().default('').optional(),
});

export type CreateRecipeRequest = TypeOf<typeof createRecipeBody>;

export const recipeParams = object({
  id: string({
    required_error: 'recipe id is required',
  }),
});

export const getRecipeSchema = object({
  params: recipeParams,
});

export type RecipeParams = TypeOf<typeof recipeParams>;
export type ReadRecipeRequest = TypeOf<typeof getRecipeSchema>;
// https://github.com/TomDoesTech/REST-API-Tutorial-Updated/blob/main/src/schema/product.schema.ts

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateRecipeRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *          default: ''
 */
