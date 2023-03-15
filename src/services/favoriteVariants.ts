// import auth0ManagementApiClient from '../clients/auth0ManagementApi';
import { NotFoundError } from 'http-error-classes';
import { FavoriteVariantIdsList, UserMetaDataSchema, createAuth0Client } from '../clients/auth0Client';

export const getUsersFavoriteVariants = async (userId: string): Promise<FavoriteVariantIdsList> => {
  const auth0Client = createAuth0Client('read:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  return userMetaData.favoriteVariants || [];
};

export const linkFavoriteVariant = async (userId: string, variantId: string): Promise<string> => {
  const auth0Client = createAuth0Client('update:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  const favoriteVariants = userMetaData.favoriteVariants || [];

  if (!favoriteVariants.includes(variantId)) {
    favoriteVariants.push(variantId);
    await auth0Client.updateUserMetadata({ id: userId }, { favoriteVariants });
  } else {
    console.log('Variant already linked');
  }

  return variantId;
};

export const unlinkFavoriteVariant = async (userId: string, variantIdToDelete: string): Promise<string> => {
  const auth0Client = createAuth0Client('update:users');

  const user = await auth0Client.getUser({ id: userId });
  const userMetaData: UserMetaDataSchema = user.user_metadata || {};
  const favoriteVariants = userMetaData.favoriteVariants || [];

  if (!favoriteVariants.includes(variantIdToDelete)) {
    throw new NotFoundError();
  }
  const newFavoriteVariants = favoriteVariants.filter((currentVariantId) => currentVariantId !== variantIdToDelete);
  await auth0Client.updateUserMetadata({ id: userId }, { favoriteVariants: newFavoriteVariants });

  return variantIdToDelete;
};
