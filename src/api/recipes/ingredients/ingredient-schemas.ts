import {
  object, string, number, boolean, TypeOf, array,
} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateIngredientRequest:
 *      type: object
 *      properties:
 *        unit:
 *          type: string
 *          required: true
 *        quantity:
 *          type: number
 *          required: true
 *        name:
 *          type: string
 *          required: true
 *        description:
 *          type: string
 *          required: true
 *    IngredientResponse:
 *      type: object
 *      properties:
 *        unit:
 *          type: string
 *          required: true
 *        quantity:
 *          type: number
 *          required: true
 *        name:
 *          type: string
 *          required: true
 *        description:
 *          type: string
 *          required: true
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createIngredientBody = object({
  unit: string(),
  quantity: number(),
  name: string(),
  description: string(),
});

export type CreateIngredientRequest = TypeOf<typeof createIngredientBody>;
