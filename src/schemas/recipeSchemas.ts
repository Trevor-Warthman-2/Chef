import {
  object, string, array, boolean, number, TypeOf,
} from 'zod';
import { createStepBody } from './stepSchemas';

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

export const createRecipeBody = object({
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

export const createRecipeParams = object({
  dishId: string({
    required_error: 'dish id is required',
  }),
});
export type CreateRecipeRequestBody = TypeOf<typeof createRecipeBody>;
export type CreateRecipeRequest = TypeOf<typeof createRecipeBody> & TypeOf<typeof createRecipeParams>;

