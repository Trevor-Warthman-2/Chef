import {
  object, string, array, boolean, number, TypeOf,
} from 'zod';
import { createStepBody } from './stepSchemas';

const justIdParam = object({
  recipeId: string({
    required_error: 'recipe id is required',
  }),
});

export const recipeSearchFilters = object({
  title: string().optional(),
  titleContains: string().optional(),
  dishId: string().optional(),
  // Add more
}).refine(({ title, titleContains }: { title?: string; titleContains?: string }) => title === undefined || titleContains === undefined, {
  message: 'Both name and nameContains cannot be defined',
});

export type RecipeSearchFilters = TypeOf<typeof recipeSearchFilters>;

/* /recipes
 */

export const showRecipeParamsSchema = justIdParam;
type ShowRecipeRequestParamsShape = TypeOf<typeof showRecipeParamsSchema>;
export type ShowRecipeRequestShape = ShowRecipeRequestParamsShape;

// export const indexRecipeParamsSchema = justIdParam;
export const indexRecipesQuerySchema = recipeSearchFilters;
// export type IndexRecipeRequestParamsShape = TypeOf<typeof indexRecipeParamsSchema>;
type IndexRecipesRequestQueryShape = TypeOf<typeof indexRecipesQuerySchema>;
export type IndexRecipesRequestShape = /* IndexRecipeRequestParamsShape & */ IndexRecipesRequestQueryShape;

type indexMyRecipesRequestQueryShape = TypeOf<typeof indexRecipesQuerySchema>;
export type indexMyRecipesRequestShape = /* IndexRecipeRequestParamsShape & */ indexMyRecipesRequestQueryShape;

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

export const updateRecipeParamsSchema = justIdParam;
type UpdateRecipeRequestParamsShape = TypeOf<typeof updateRecipeParamsSchema>;
export type UpdateRecipesRequestShape = UpdateRecipeRequestParamsShape;

export const deleteRecipeParamsSchema = justIdParam;
type DeleteRecipeRequestParamsShape = TypeOf<typeof deleteRecipeParamsSchema>;
export type DeleteRecipesRequestShape = DeleteRecipeRequestParamsShape;

// /dishes/{id}/recipes

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
 *          required: true
 *        steps:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateStepRequest'
 *        cooked:
 *          type: boolean
 *        chefsChoice:
 *          type: boolean
 *        authorRating:
 *          type: number
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
 *        steps:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/StepResponse'
 *        cooked:
 *          type: boolean
 *        chefsChoice:
 *          type: boolean
 *        authorRating:
 *          type: number
 */

export const createRecipeBodySchema = object({
  title: string({
    required_error: 'recipe title is required',
  }),
  description: string({
    required_error: 'recipe description is required',
  }),
  steps: array(createStepBody),
  cooked: boolean(),
  chefsChoice: boolean(),
  authorRating: number(),
});

export const createRecipeParamsSchema = object({
  dishId: string({
    required_error: 'dish id is required',
  }),
});

export type CreateRecipeRequestBodyShape = TypeOf<typeof createRecipeBodySchema>;
export type CreateRecipeRequestParamsShape = TypeOf<typeof createRecipeParamsSchema>;
export type CreateRecipeRequestShape = CreateRecipeRequestBodyShape & CreateRecipeRequestParamsShape;
