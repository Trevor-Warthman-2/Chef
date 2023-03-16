import {
  object, string, array, TypeOf,
} from 'zod';
import { createVariantBody } from './variantSchemas';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRecipeRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          required: true
 *        description:
 *          type: string
 *          default: ''
 *        variants:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateVariantRequest'
 *    RecipeResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        variants:
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

export const createRecipeBody = object({
  title: string({
    required_error: 'Title is required',
  }),
  description: string().default('').optional(),
  variants: array(createVariantBody).nonempty(),
});

export type CreateRecipeRequestBody = TypeOf<typeof createRecipeBody>;
// export type CreateRecipeRequest = TypeOf<typeof createRecipeBody>;

export const recipeParams = object({
  recipeId: string({
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
 */
// Make this include title and desc but NOT varients
