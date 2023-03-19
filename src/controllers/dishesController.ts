import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Recipe, { RecipeDocument, CreateRecipeShape } from '../models/recipe';
import Dish from '../models/dish';
import { CreateDishRequestBody, DishParams } from '../schemas/dishSchemas';

// import { ReadDishRequest } from '../schemas/dishSchemas';

const createDish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } : { body: CreateDishRequestBody } = req;
  const { title, description, recipes } = body;

  const dish = new Dish({
    title,
    description,
  });

  const promisedRecipes: Array<Promise<RecipeDocument>> = [];
  for (const recipe of recipes) {
    const createRecipeShape: CreateRecipeShape = { ...recipe, dishId: dish._id };
    const createdRecipe: Promise<RecipeDocument> = Recipe.create(createRecipeShape);
    promisedRecipes.push(createdRecipe);
  }

  const createdRecipes = await Promise.all(promisedRecipes);

  createdRecipes.forEach((recipe) => { dish.recipes.push(recipe._id); });

  const savedDish = await dish.save();
  await savedDish.populate('recipes');

  res.status(201).json(savedDish);
};

const readDish = async (req: Request<DishParams>, res: Response, next: NextFunction): Promise<void> => {
  // const { id } : { id: string } = req.params;
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);

  if (!dish) {
    throw new NotFoundError(`no dish found with id ${dishId}`);
  }

  res.status(200).json({ dish });
};

const readAllDishes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dishes = await Dish.find();
  res.status(200).json({ dishes });
};

const updateDish = async (req: Request, res: Response, next: NextFunction) => {
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: 'not found' });
    return;
  }
  dish.set(req.body);
  dish.save();

  res.status(200).json({ dish });
};

const deleteDish = async (req: Request, res: Response, next: NextFunction) => {
  const { dishId } = req.params;

  const dish = await Dish.findByIdAndDelete(dishId);

  // if (!dish) {
  //   res.status(404).json({ message: 'not found' });
  // }
  res.status(204).json({ dish });
};

export default {
  createDish, readDish, readAllDishes, updateDish, deleteDish,
};
