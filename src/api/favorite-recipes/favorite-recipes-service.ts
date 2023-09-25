// import auth0ManagementApiClient from '../clients/auth0ManagementApi';
import { NotFoundError } from 'http-error-classes';
import { FavoriteRecipeIdsList, UserMetaDataSchema, createAuth0Client } from '../../clients/auth0-client';

export const getUsersFavoriteRecipes = async (userId: string): Promise<FavoriteRecipeIdsList> => {
  const auth0Client = createAuth0Client('read:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  return userMetaData.favoriteRecipes || [];
};

export const linkFavoriteRecipe = async (userId: string, recipeId: string): Promise<string> => {
  const auth0Client = createAuth0Client('update:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  const favoriteRecipes = userMetaData.favoriteRecipes || [];

  if (!favoriteRecipes.includes(recipeId)) {
    favoriteRecipes.push(recipeId);
    await auth0Client.updateUserMetadata({ id: userId }, { favoriteRecipes }); // Might want to make this it's own table later
  } else {
    console.log('Recipe already linked');
  }

  return recipeId;
};

export const unlinkFavoriteRecipe = async (userId: string, recipeIdToDelete: string): Promise<string> => {
  const auth0Client = createAuth0Client('update:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  const favoriteRecipes = userMetaData.favoriteRecipes || [];

  if (!favoriteRecipes.includes(recipeIdToDelete)) {
    throw new NotFoundError();
  }
  const newFavoriteRecipes = favoriteRecipes.filter((currentRecipeId) => currentRecipeId !== recipeIdToDelete);
  await auth0Client.updateUserMetadata({ id: userId }, { favoriteRecipes: newFavoriteRecipes });

  return recipeIdToDelete;
};
