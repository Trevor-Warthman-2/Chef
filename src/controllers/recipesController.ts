import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Variant, { VariantDocument, CreateVariantShape } from '../models/variant';
import Recipe from '../models/recipe';
import { CreateRecipeRequestBody, RecipeParams } from '../schemas/recipeSchemas';

// import { ReadRecipeRequest } from '../schemas/recipeSchemas';

const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } : { body: CreateRecipeRequestBody } = req;
  const { title, description, variants } = body;

  const recipe = new Recipe({
    title,
    description,
  });

  const promisedVariants: Array<Promise<VariantDocument>> = [];
  for (const variant of variants) {
    const createVariantShape: CreateVariantShape = { ...variant, recipeId: recipe._id };
    const createdVariant: Promise<VariantDocument> = Variant.create(createVariantShape);
    promisedVariants.push(createdVariant);
  }

  const createdVariants = await Promise.all(promisedVariants);

  createdVariants.forEach((variant) => { recipe.variants.push(variant._id); });

  const savedRecipe = await recipe.save();
  await savedRecipe.populate('variants');

  res.status(201).json({ savedRecipe });
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

export default {
  createRecipe, readRecipe, readAllRecipes, updateRecipe, deleteRecipe,
};
