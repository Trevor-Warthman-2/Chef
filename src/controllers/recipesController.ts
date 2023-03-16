import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from 'http-error-classes';
import Recipe from '../models/recipe';
import { CreateRecipeRequestBody, RecipeParams } from '../schemas/recipeSchemas';
import Variant, { variantSchema } from '../models/variant';
// import { ReadRecipeRequest } from '../schemas/recipeSchemas';

const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } : { body: CreateRecipeRequestBody } = req;
  const { title, description, variants } = body;

  const variantModels = await Variant.create(variants);

  const recipe = new Recipe({
    title,
    description,
    variants: variantModels,
  });

  await recipe.save();
  res.status(201).json({ recipe });
};

const readRecipe = async (req: Request<RecipeParams>, res: Response, next: NextFunction): Promise<void> => {
  // const { id } : { id: string } = req.params;
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new NotFoundError(`no recipe found with id ${recipeId}`);
  }

  res.status(200).json({ recipe });
};

const readAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const recipes = await Recipe.find();
  res.status(200).json({ recipes });
};

const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: 'not found' });
    return;
  }
  recipe.set(req.body);
  recipe.save();

  res.status(200).json({ recipe });
};

const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findByIdAndDelete(recipeId);

  // if (!recipe) {
  //   res.status(404).json({ message: 'not found' });
  // }
  res.status(204).json({ recipe });
};

/* Variants */

const createVariant = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404).json({ message: `No Recipe with id ${recipeId} found.` });
    return;
  }
  const variant = new Variant(req.body);
  recipe.variants.push(variant);
  await recipe.save();

  res.status(201).json({ variant });
};

const deleteVariant = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId, variantId } = req.params;

  // const recipe = (await Recipe.findById(recipeId));
  const variant = await Variant.findByIdAndRemove(variantId);
  console.log(variant);

  // if (!recipe) {
  //   res.status(404).json({ message: `Recipe with id ${recipeId} not found` });
  // }

  // console.log(recipe!.variants.id(variantId));
  // const variant = recipe?.variants.find((variant) => variant._id === variantId));

  // if (!variant) {
  //   res.status(404).json({ message: `Recipe Variant with id ${recipeId} not found` });
  // }
  // res.status(204).json({ variant });
};

export default {
  createRecipe, readRecipe, readAllRecipes, updateRecipe, deleteRecipe, createVariant, deleteVariant,
};
