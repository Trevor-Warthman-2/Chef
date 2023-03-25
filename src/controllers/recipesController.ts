import { Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Types from 'mongoose';
import Dish from '../models/dish';
import Recipe, { RecipeDocument } from '../models/recipe';
import {
  CreateRecipeRequestShape, DeleteRecipesRequestShape, ShowRecipeRequestShape, UpdateRecipesRequestShape,
} from '../schemas/recipeSchemas';
import { IndexDishesRequestShape } from '../schemas/dishSchemas';

const createRecipe = async (req: Request<CreateRecipeRequestShape>, res: Response): Promise<void> => {
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: `No Dish with id ${dishId} found.` });
    return;
  }

  const createRecipeShape: CreateRecipeRequestShape & Types.ObjectId = { ...req.body, dishId: dish._id };
  const createdRecipe: RecipeDocument = await Recipe.create(createRecipeShape);

  dish.recipes.push(createdRecipe._id);
  dish.save();

  res.status(201).json(createdRecipe);
};

const showRecipe = async (req: Request<ShowRecipeRequestShape>, res: Response): Promise<void> => {
  console.log('show')
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new NotFoundError(`no recipe found with id ${recipeId}`);
  }

  res.status(200).json(recipe);
};

const indexRecipes = async (req: Request<IndexDishesRequestShape>, res: Response): Promise<void> => {
  console.log('index')
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
};

const updateRecipe = async (req: Request<UpdateRecipesRequestShape>, res: Response): Promise<void> => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: `recipe with id ${recipeId} not found` });
  } else {
    recipe.set(req.body);
    recipe.save();
  }

  res.status(200).json(recipe);
};

const deleteRecipe = async (req: Request<DeleteRecipesRequestShape>, res: Response): Promise<void> => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findOneAndDelete({ _id: recipeId });

  res.status(204).json({ recipe });
};

export default {
  createRecipe, showRecipe, indexRecipes, updateRecipe, deleteRecipe,
};
