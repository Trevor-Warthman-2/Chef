import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Recipe from '../models/recipe';
import { RecipeParams } from '../schemas/recipeSchemas';
// import { ReadRecipeRequest } from '../schemas/recipeSchemas';

const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description } : { title: string; description: string } = req.body;

  const recipe = new Recipe({
    // _id: new mongoose.Types.ObjectId(),
    title,
    description,
  });

  await recipe.save();
  res.status(201).json({ recipe });
};

const readRecipe = async (req: Request<RecipeParams>, res: Response, next: NextFunction): Promise<void> => {
  // const { id } : { id: string } = req.params;
  const { id } = req.params;

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    throw new NotFoundError(`no recipe found with id ${id}`);
  }

  res.status(200).json({ recipe });

  // .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
};

const readAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const recipes = await Recipe.find();
  res.status(200).json({ recipes });
};

const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const { id } = req.params;

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    res.status(404).json({ message: 'not found' });
    return;
  }
  recipe.set(req.body);
  recipe.save();

  res.status(200).json({ recipe });
};

const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) {
    res.status(404).json({ message: 'not found' });
  } else {
    res.status(204).json({ recipe });
  }
};

export default {
  createRecipe, readRecipe, readAllRecipes, updateRecipe, deleteRecipe,
};
