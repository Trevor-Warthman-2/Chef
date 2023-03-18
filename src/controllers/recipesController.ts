import { NextFunction, Request, Response } from 'express';
import Dish from '../models/dish';
import Recipe from '../models/recipe';

const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: `No Dish with id ${dishId} found.` });
    return;
  }
  const recipe = new Recipe(req.body);
  dish.recipes.push(recipe._id);
  await dish.save();

  res.status(201).json({ recipe });
};

const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findOneAndDelete({ _id: recipeId });

  res.status(204).json({ recipe });
};

export default {
  createRecipe, deleteRecipe,
};
