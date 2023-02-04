import mongoose, { Schema } from 'mongoose';

export interface IngredientDocument {
    unit: string;
    quantity: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const ingredientSchema: Schema = new Schema(
  {
    unit: String,
    quantity: Number,
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Ingredient = mongoose.model<IngredientDocument>('Ingredient', ingredientSchema);

export default Ingredient;
