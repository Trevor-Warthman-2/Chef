import mongoose, { Schema, Types } from 'mongoose';
import { NotFoundError } from 'http-error-classes';
import { StepDocument } from './step';
import Dish from './dish';
import { AuthorId, AuthorIdSchema } from '../randomTypes';

export interface RecipeDocument {
    _id: Types.ObjectId;
    title: string;
    description: string;
    dishId: Types.ObjectId;
    cooked: boolean;
    chefsChoice: boolean;
    author: AuthorId;
    authorRating: number;
    steps: Array<StepDocument>;
    createdAt: Date;
    updatedAt: Date;
}

export const recipeSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
    dishId: { type: Schema.Types.ObjectId, ref: 'Dish' },
    steps: {
      type: Array,
      ref: 'Step',
    },
    /* tags: {
      type: [Tag],
    }, */
    cooked: Boolean,
    chefsChoice: Boolean,
    author: AuthorIdSchema,
    authorRating: Number,
    /* ratings: {
      type: [RecipeRating],
    }, */
  },
  {
    timestamps: true,
  },
);

// Recipe Middleware

const deleteDishRelations = async (recipeDocument: RecipeDocument): Promise<void> => {
  if (!recipeDocument) {
    throw new NotFoundError('Recipe not found in deleteDishRelations middleware');
  }

  const dish = await Dish.findById(recipeDocument.dishId);
  if (!dish) {
    throw new NotFoundError(`Dish with id ${recipeDocument.dishId} not found`);
  }
  dish.recipes.splice(dish?.recipes.indexOf(recipeDocument.dishId), 1);
  await dish.save();
  console.log(`Removed reference from Dish ${recipeDocument.dishId} to Recipe ${recipeDocument._id}`);
};

recipeSchema.post('deleteOne', deleteDishRelations);
recipeSchema.post('findOneAndDelete', deleteDishRelations);
// recipeSchema.post('deleteMany', deleteDishRelations);
// I'm not sure how to deal with the cycle that happens when they start calling each other

const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;

// export default mongoose.model<IDishModel>('Author', DishSchema);
// type CreateRecipeRequestParams = {
//   dishId: Types.ObjectId;
// }
// export type CreateRecipeShape = CreateRecipeRequestBody & CreateRecipeRequestParams
