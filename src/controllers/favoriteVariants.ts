import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import { getUsersFavoriteVariants, linkFavoriteVariant, unlinkFavoriteVariant } from '../services/favoriteVariants';

const createFavoriteVariant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { variantId } : { variantId: string } = req.body;

  const savedId = await linkFavoriteVariant((req.oidc as any).user.sub, variantId);
  res.status(201).json({ message: 'Vairant Linked!', variantId: savedId });
};

const readMyFavoriteVariants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const favoriteVariants = await getUsersFavoriteVariants((req.oidc as any).user.sub);
  // Auth0ManagementClient.get('/user')
  res.status(200).json({ favoriteVariants });
};

export const deleteFavoriteVariant = async (req: Request, res: Response, next: NextFunction) => {
  const { variantId } = req.params;
  const { oidc }: any = req;

  let returnedVariantId;
  try {
    returnedVariantId = await unlinkFavoriteVariant(oidc.user.sub, variantId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: 'Not Found' });
    }
    throw error;
  }

  res.status(204).json({ message: 'Variant Unlinked!', variantId: returnedVariantId });
};

export default {
  readMyFavoriteVariants, createFavoriteVariant, deleteFavoriteVariant,
};
