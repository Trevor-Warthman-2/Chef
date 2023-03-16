import mongoose, { Schema } from 'mongoose';
import Step, { StepDocument } from './step';
import { RecipeDocument } from './recipe';

export interface VariantDocument {
    title: string;
    description: string;
    recipe: RecipeDocument;
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
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
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

const deleteRecipeRelations = async (doc): Promise<void> => {
  await Variant.deleteMany({ _id: { $in: doc.variants } });
};

variantSchema.post('remove', deleteRecipeRelations);
variantSchema.post('deleteOne', deleteRecipeRelations);
variantSchema.post('findOneAndDelete', deleteRecipeRelations);
variantSchema.post('deleteMany', deleteRecipeRelations);

const Variant = mongoose.model<VariantDocument>('Variant', variantSchema);

export default Variant;

// export default mongoose.model<IRecipeModel>('Author', RecipeSchema);
