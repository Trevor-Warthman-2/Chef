import mongoose, { Schema } from 'mongoose';
import { VariantDocument } from './variant';

/* export interface IRecipe {
    title: string;
    description: string;
}

export interface IRecipeModel extends IRecipe, Document {} */

export interface RecipeDocument {
    title: string;
    description: string;
    variants: Array<VariantDocument>;
    createdAt: Date;
    updatedAt: Date;
}

const recipeSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
    variants: {
      type: Array,
      ref: 'Variant',
    },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;

// export default mongoose.model<IRecipeModel>('Author', RecipeSchema);
