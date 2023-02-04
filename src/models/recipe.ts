import mongoose, { Schema } from 'mongoose';

/* export interface IRecipe {
    title: string;
    description: string;
}

export interface IRecipeModel extends IRecipe, Document {} */

export interface RecipeDocument {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
}

const recipeSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;

// export default mongoose.model<IRecipeModel>('Author', RecipeSchema);
