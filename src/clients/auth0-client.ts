import { ManagementClient } from 'auth0';

export const createAuth0Client = (scopes: string): ManagementClient => new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_API_BASE_URL || '', // Had to add or for ts to compile
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  scope: scopes,
});

export type FavoriteRecipeIdsList = Array<string>;

export type UserMetaDataSchema = {
  favoriteRecipes?: FavoriteRecipeIdsList;
}

