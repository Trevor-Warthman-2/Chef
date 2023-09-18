import Recipe, { RecipeDocument } from '../models/recipe';
import { RecipeSearchFilters } from '../schemas/recipeSchemas';

type AllowedFilters = RecipeSearchFilters & {
  author: string;
}

export const filterRecipes = (filters: AllowedFilters): Promise<Array<RecipeDocument>> => {
  console.log('HERE', { ...(filters.author && { author: filters.author }) });
  const x = Recipe.find({
    ...(filters.title && { title: filters.title }),
    ...(filters.titleContains && { title: new RegExp(filters.titleContains) }),
    ...(filters.author && { 'dish.author???': filters.author }),
    HERE"S THE CURRENT ISSUE
    the author is saved on the dish. So above we need to access the property recipe.dish.author somehow, which may not be possible in a Mongoose Resource.find()
  }).exec();
  console.log(x);
  return x;
};

