import { NextFunction, Request, Response } from 'express';
import Recipe from '../models/recipe';
import Variant from '../models/variant';

const createVariant = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: `No Recipe with id ${recipeId} found.` });
    return;
  }
  const variant = new Variant(req.body);
  recipe.variants.push(variant._id);
  await recipe.save();

  res.status(201).json({ variant });
};

const deleteVariant = async (req: Request, res: Response, next: NextFunction) => {
  const { variantId } = req.params;

  const variant = await Variant.findOneAndDelete({ _id: variantId });

  res.status(204).json({ variant });
};

export default {
  createVariant, deleteVariant,
};
