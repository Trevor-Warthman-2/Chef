import { NextFunction, Request, Response } from 'express';
import Dish from '../models/dish';
import Recipe, { CreateRecipeShape, RecipeDocument } from '../models/recipe';

const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: `No Dish with id ${dishId} found.` });
    return;
  }

  const createRecipeShape: CreateRecipeShape = { ...req.body, dishId: dish._id };
  const createdRecipe: RecipeDocument = await Recipe.create(createRecipeShape);

  dish.recipes.push(createdRecipe._id);
  await dish.save();

  res.status(201).json(createdRecipe);
};

const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findOneAndDelete({ _id: recipeId });

  res.status(204).json({ recipe });
};

export default {
  createRecipe, deleteRecipe,
};
