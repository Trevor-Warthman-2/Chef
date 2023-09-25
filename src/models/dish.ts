import mongoose, { Schema, Types } from 'mongoose';
import Recipe, { RecipeDocument } from './recipe';
import { AuthorId, AuthorIdSchema } from '../randomTypes';

/* export interface IDish {
    title: string;
    description: string;
}

export interface IDishModel extends IDish, Document {} */

export interface DishDocument {
    _id: Types.ObjectId;
    title: string;
    description: string;
    author: AuthorId;
    recipes: Array<Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
}

const dishSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
    author: AuthorIdSchema,
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    /* recipes: {
      type: Array,
      ref: 'Recipe',
    }, */
    // recipes: [recipeSchema],
  },
  {
    timestamps: true,
  },
);

// reference: https://mongoosejs.com/docs/middleware.html
const deleteRecipeRelations = async (dishDocument: DishDocument): Promise<void> => {
  await Recipe.deleteMany({ _id: { $in: dishDocument.recipes } });
  // console.log(`Removed reference from Recipes ${deleted.map((del) => del._id)} to Dish ${dishDocument._id}`);
};

dishSchema.post('deleteOne', deleteRecipeRelations);
dishSchema.post('findOneAndDelete', deleteRecipeRelations);
dishSchema.post('deleteMany', deleteRecipeRelations);

const Dish = mongoose.model<DishDocument>('Dish', dishSchema);

export default Dish;

