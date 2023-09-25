import { Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Types from 'mongoose';
import Dish from '../models/dish';
import Recipe, { RecipeDocument } from '../models/recipe';
import {
  CreateRecipeRequestShape, DeleteRecipesRequestShape, indexMyRecipesRequestShape, ShowRecipeRequestShape, UpdateRecipesRequestShape,
} from '../schemas/recipeSchemas';
import { IndexDishesRequestShape } from '../schemas/dishSchemas';
import { filterRecipes } from '../services/recipesService';

const createRecipe = async (req: Request<CreateRecipeRequestShape>, res: Response): Promise<void> => {
  const { oidc } = req;
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: `No Dish with id ${dishId} found.` });
    return;
  }

  const createRecipeShape: CreateRecipeRequestShape & Types.ObjectId = { ...req.body, dishId: dish._id, author: oidc.isAuthenticated() ? oidc.user.sub : 'guest' };
  const createdRecipe: RecipeDocument = await Recipe.create(createRecipeShape);

  dish.recipes.push(createdRecipe._id);
  await dish.save();

  res.status(201).json(createdRecipe);
};

const showRecipe = async (req: Request<ShowRecipeRequestShape>, res: Response): Promise<void> => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new NotFoundError(`no recipe found with id ${recipeId}`);
  }

  res.status(200).json(recipe);
};

const indexRecipes = async (req: Request<IndexDishesRequestShape>, res: Response): Promise<void> => {
  const { query } = req;
  const recipes = await filterRecipes(query);
  res.status(200).json(recipes);
};

const indexMyRecipes = async (req: Request<indexMyRecipesRequestShape>, res: Response): Promise<void> => {
  const { query, oidc }: any = req;
  query.author = oidc.user.sub;
  const recipes = await filterRecipes(query);
  res.status(200).json(recipes);
};

const updateRecipe = async (req: Request<UpdateRecipesRequestShape>, res: Response): Promise<void> => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: `recipe with id ${recipeId} not found` });
  } else {
    recipe.set(req.body);
    await recipe.save();
  }

  res.status(200).json(recipe);
};

const deleteRecipe = async (req: Request<DeleteRecipesRequestShape>, res: Response): Promise<void> => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findOneAndDelete({ _id: recipeId });

  res.status(204).json({ recipe });
};

export default {
  createRecipe, showRecipe, indexRecipes, indexMyRecipes, updateRecipe, deleteRecipe,
};
