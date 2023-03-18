import mongoose, { Schema, Types } from 'mongoose';
import Variant, { VariantDocument } from './variant';

/* export interface IRecipe {
    title: string;
    description: string;
}

export interface IRecipeModel extends IRecipe, Document {} */

export interface RecipeDocument {
    _id: Types.ObjectId;
    title: string;
    description: string;
    variants: Array<Types.ObjectId>;
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
const deleteVariantRelations = async (recipeDocument: RecipeDocument): Promise<void> => {
  await Variant.deleteMany({ _id: { $in: recipeDocument.variants } });
  // console.log(`Removed reference from Variants ${deleted.map((del) => del._id)} to Recipe ${recipeDocument._id}`);
};

recipeSchema.post('deleteOne', deleteVariantRelations);
recipeSchema.post('findOneAndDelete', deleteVariantRelations);
recipeSchema.post('deleteMany', deleteVariantRelations);

const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;

