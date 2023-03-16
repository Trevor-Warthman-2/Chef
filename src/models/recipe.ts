import mongoose, { Schema } from 'mongoose';
import { InternalServerError } from 'http-error-classes';
import Variant, { VariantDocument } from './variant';

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
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    /* variants: {
      type: Array,
      ref: 'Variant',
    }, */
    // variants: [variantSchema],
  },
  {
    timestamps: true,
  },
);

// reference: https://mongoosejs.com/docs/middleware.html
const deleteVariantRelations = async (doc): Promise<void> => {
  await Variant.deleteMany({ _id: { $in: doc.variants } });
};

recipeSchema.post('remove', deleteVariantRelations);
recipeSchema.post('deleteOne', deleteVariantRelations);
recipeSchema.post('findOneAndDelete', deleteVariantRelations);
recipeSchema.post('deleteMany', deleteVariantRelations);

const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;

