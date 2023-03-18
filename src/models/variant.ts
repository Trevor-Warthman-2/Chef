import mongoose, { Schema, Types } from 'mongoose';
import { NotFoundError } from 'http-error-classes';
import Step, { StepDocument } from './step';
import Recipe, { RecipeDocument } from './recipe';
import { CreateVariantRequestBody } from '../schemas/variantSchemas';

export interface VariantDocument {
    _id: Types.ObjectId;
    title: string;
    description: string;
    recipeId: Types.ObjectId;
    cooked: boolean;
    chefsChoice: boolean;
    authorRating: number;
    steps: Array<StepDocument>;
    createdAt: Date;
    updatedAt: Date;
}

export const variantSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    steps: {
      type: Array,
      ref: 'Step',
    },
    /* tags: {
      type: [Tag],
    }, */
    cooked: Boolean,
    chefsChoice: Boolean,
    authorRating: Number,
    /* ratings: {
      type: [VariantRating],
    }, */
  },
  {
    timestamps: true,
  },
);

// Variant Middleware

const deleteRecipeRelations = async (variantDocument: VariantDocument): Promise<void> => {
  const recipe = await Recipe.findById(variantDocument.recipeId);
  if (!recipe) {
    throw new NotFoundError(`Recipe with id ${variantDocument.recipeId} not found`);
  }
  recipe.variants.splice(recipe?.variants.indexOf(variantDocument.recipeId), 1);
  await recipe.save();
  console.log(`Removed reference from Recipe ${variantDocument.recipeId} to Variant ${variantDocument._id}`);
};

variantSchema.post('deleteOne', deleteRecipeRelations);
variantSchema.post('findOneAndDelete', deleteRecipeRelations);
variantSchema.post('deleteMany', deleteRecipeRelations);

const Variant = mongoose.model<VariantDocument>('Variant', variantSchema);

export default Variant;

// export default mongoose.model<IRecipeModel>('Author', RecipeSchema);
type CreateVariantRequestParams = {
  recipeId: Types.ObjectId;
}
export type CreateVariantShape = CreateVariantRequestBody & CreateVariantRequestParams
