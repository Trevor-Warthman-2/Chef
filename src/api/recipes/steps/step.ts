import mongoose, { Schema } from 'mongoose';
import Ingredient, { IngredientDocument } from '../ingredients/ingredient';

export interface StepDocument {
    order: number;
    text: string;
    optional: boolean;
    ingredients: Array<IngredientDocument>;
    createdAt: Date;
    updatedAt: Date;
}

const stepSchema: Schema = new Schema(
  {
    unit: String,
    quantity: Number,
    name: String,
    description: String,
    optional: Boolean,
    ingredients: {
      type: Array,
      ref: 'Ingredient',
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Step = mongoose.model<StepDocument>('Step', stepSchema);

export default Step;
