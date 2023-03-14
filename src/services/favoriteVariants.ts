// import auth0ManagementApiClient from '../clients/auth0ManagementApi';
import { FavoriteVariantsList, UserMetaDataSchema, createAuth0Client } from '../clients/auth0Client';

export const getUsersFavoriteVariants = async (userId: string): Promise<FavoriteVariantsList> => {
  const auth0Client = createAuth0Client('read:users');
  console.log('calling', userId);
  some error in client here
  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  const { favoriteVariants } = userMetaData;
  return favoriteVariants || [];
};

