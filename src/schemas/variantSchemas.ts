import {
  object, string, array, boolean, number, TypeOf,
} from 'zod';
import { createStepBody } from './stepSchemas';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateVariantRequest:
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
 *    VariantResponse:
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

export const createVariantBody = object({
  title: string({
    required_error: 'variant title is required',
  }),
  description: string({
    required_error: 'variant description is required',
  }),
  steps: array(createStepBody),
  cooked: boolean(),
  chefsChoice: boolean(),
  authorRating: number(),
});

export const createVariantParams = object({
  recipeId: string({
    required_error: 'recipe id is required',
  }),
});
export type CreateVariantRequestBody = TypeOf<typeof createVariantBody>;
export type CreateVariantRequest = TypeOf<typeof createVariantBody> & TypeOf<typeof createVariantParams>;

