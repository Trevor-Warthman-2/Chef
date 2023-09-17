import Recipe, { RecipeDocument } from '../models/recipe';
import { RecipeSearchFilters } from '../schemas/recipeSchemas';

export const filterRecipes = (filters: RecipeSearchFilters): Promise<Array<RecipeDocument>> => Recipe.find({
  ...(filters.title && { title: filters.title }),
  ...(filters.titleContains && { title: new RegExp(filters.titleContains) }),
}).exec();

