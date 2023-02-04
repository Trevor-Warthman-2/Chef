import mongoose, { Schema } from 'mongoose';
import Step, { StepDocument } from './step';

export interface VariantDocument {
    title: string;
    description: string;
    cooked: boolean;
    chefsChoice: boolean;
    authorRating: number;
    steps: Array<StepDocument>;
    createdAt: Date;
    updatedAt: Date;
}

const variantSchema: Schema = new Schema(
  {
    title: String,
    description: { type: String },
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

const Variant = mongoose.model<VariantDocument>('Variant', variantSchema);

export default Variant;

// export default mongoose.model<IRecipeModel>('Author', RecipeSchema);
