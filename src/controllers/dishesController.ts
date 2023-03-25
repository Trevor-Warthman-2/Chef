import { Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Types from 'mongoose';
import Recipe, { RecipeDocument } from '../models/recipe';
import Dish from '../models/dish';
import {
  CreateDishRequestBodyShape, DeleteDishRequestShape, IndexDishesRequestShape, ShowDishRequestShape, UpdateDishRequestShape,
} from '../schemas/dishSchemas';
import { CreateRecipeRequestBodyShape, CreateRecipeRequestShape } from '../schemas/recipeSchemas';

// import { ReadDishRequest } from '../schemas/dishSchemas';

const createDish = async (req: Request<CreateRecipeRequestShape>, res: Response): Promise<void> => {
  const { body } = req;
  const { title, description, recipes } = body;

  const dish = new Dish({
    title,
    description,
  });

  const promisedRecipes: Array<Promise<RecipeDocument>> = [];
  for (const recipe of recipes) {
    const createRecipeShape: CreateRecipeRequestBodyShape & Types.ObjectId = { ...recipe, dishId: dish._id };
    const createdRecipe: Promise<RecipeDocument> = Recipe.create(createRecipeShape);
    promisedRecipes.push(createdRecipe);
  }

  const createdRecipes = await Promise.all(promisedRecipes);

  createdRecipes.forEach((recipe: RecipeDocument) => { dish.recipes.push(recipe._id); });

  const savedDish = dish.save();
  // await savedDish.populate('recipes');

  res.status(201).json(savedDish);
};

const showDish = async (req: Request<ShowDishRequestShape>, res: Response): Promise<void> => {
  // const { id } : { id: string } = req.params;
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);

  if (!dish) {
    throw new NotFoundError(`no dish found with id ${dishId}`);
  }

  // await dish.populate('recipes');

  res.status(200).json(dish);
};

const indexDishes = async (req: Request<IndexDishesRequestShape>, res: Response): Promise<void> => {
  const dishes = await Dish.find();
  res.status(200).json(dishes);
};

const updateDish = async (req: Request<UpdateDishRequestShape>, res: Response): Promise<void> => {
  const { dishId } = req.params;

  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).json({ message: 'not found' });
    return;
  }
  dish.set(req.body);
  dish.save();

  res.status(200).json(dish);
};

const deleteDish = async (req: Request<DeleteDishRequestShape>, res: Response): Promise<void> => {
  const { dishId } = req.params;

  const dish = await Dish.findByIdAndDelete(dishId);

  // if (!dish) {
  //   res.status(404).json({ message: 'not found' });
  // }
  res.status(204).json(dish);
};

/* TODO create index /dish/{id}/recipes/ */

export default {
  createDish, showDish, indexDishes, updateDish, deleteDish,
};
