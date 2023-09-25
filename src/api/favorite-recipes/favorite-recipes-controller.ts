import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import { getUsersFavoriteRecipes, linkFavoriteRecipe, unlinkFavoriteRecipe } from './favorite-recipes-service';

const createFavoriteRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { recipeId } : { recipeId: string } = req.body;

  const savedId = await linkFavoriteRecipe((req.oidc as any).user.sub, recipeId);
  res.status(201).json({ message: 'Vairant Linked!', recipeId: savedId });
};

const readMyFavoriteRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const favoriteRecipes = await getUsersFavoriteRecipes((req.oidc as any).user.sub);
  // Auth0ManagementClient.get('/user')
  res.status(200).json({ favoriteRecipes });
};

export const deleteFavoriteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { recipeId } = req.params;
  const { oidc }: any = req;

  let returnedRecipeId;
  try {
    returnedRecipeId = await unlinkFavoriteRecipe(oidc.user.sub, recipeId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: 'Not Found' });
    }
    throw error;
  }

  res.status(204).json({ message: 'Recipe Unlinked!', recipeId: returnedRecipeId });
};

export default {
  readMyFavoriteRecipes, createFavoriteRecipe, deleteFavoriteRecipe,
};
