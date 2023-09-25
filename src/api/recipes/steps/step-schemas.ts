import {
  object, string, number, boolean, TypeOf, array,
} from 'zod';
import { createIngredientBody } from '../ingredients/ingredient-schemas';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateStepRequest:
 *      type: object
 *      properties:
 *        order:
 *          type: number
 *          required: true
 *        text:
 *          type: string
 *          required: true
 *        optional:
 *          type: boolean
 *        ingredients:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateIngredientRequest'
 *    StepResponse:
 *      type: object
 *      properties:
 *        order:
 *          type: number
 *          required: true
 *        text:
 *          type: string
 *          required: true
 *        optional:
 *          type: boolean
 *        ingredients:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/IngredientResponse'
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createStepBody = object({
  order: number(),
  text: string(),
  optional: boolean().default(false),
  ingredients: array(createIngredientBody),
});

export type CreateStepRequest = TypeOf<typeof createStepBody>;
