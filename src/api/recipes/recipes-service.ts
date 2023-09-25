import Recipe, { RecipeDocument } from './recipe';
import { RecipeSearchFilters } from './recipe-schemas';

type AllowedFilters = RecipeSearchFilters & {
  author: string;
}

export const filterRecipes = async (filters: AllowedFilters): Promise<Array<RecipeDocument>> => {
  console.log('HERE', { ...(filters.author && { author: filters.author }) });
  const y = Recipe.find({ x: 123 }).exec();
  console.log('filt', filters);
  console.log('test obj', (await y).length, await y);
  const x = Recipe
    .find({
      ...(filters.title && { title: filters.title }),
      ...(filters.titleContains && { title: new RegExp(filters.titleContains) }),
      ...(filters.dishId && { dishId: filters.dishId }),
      ...(filters.author && { author: filters.author }),
    // TODO issue here couldn't filter over dish.author because this is a nested schema not a subdocument. Solution: put ids on the recipes too which is more efficient anyways but still ugh. Would like to avoid that in the future.
    })
    // .where('dish.author').equals(filters.author)
    .sort('createdAt')
    .exec();

  // if (filters.author) {
  //   x = x.where(filters.author && { 'dish.author': filters.author }),
  // }
  // (await x).set('X-Total-Count', x.length);
  // console.log(await x);
  return x;
};

