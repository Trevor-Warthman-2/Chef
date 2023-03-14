import { NextFunction, Request, Response } from 'express';
import { getUsersFavoriteVariants } from '../services/favoriteVariants';

// import favoriteVariant from '../models/favoriteVariant';
// import { favoriteVariantParams } from '../schemas/favoriteVariantSchemas';
// import { ReadfavoriteVariantRequest } from '../schemas/favoriteVariantSchemas';

// const createfavoriteVariant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { title, description } : { title: string; description: string } = req.body;

//   const favoriteVariant = new favoriteVariant({
//     // _id: new mongoose.Types.ObjectId(),
//     title,
//     description,
//   });

//   await favoriteVariant.save();
//   res.status(201).json({ favoriteVariant });
// };

export const readMyFavoriteVariants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('MADE IT TO CONTROLLER');
  const { oidc }: any = req;
  console.log(oidc.user);
  getUsersFavoriteVariants(oidc.user.sub);
  // Auth0ManagementClient.get('/user')
  const favoriteVariants = []; // await favoriteVariant.find();
  res.status(200).json({ favoriteVariants });
};

// const deletefavoriteVariant = async (req: Request, res: Response, next: NextFunction) => {
//   const { favoriteVariantId } = req.params;

//   const favoriteVariant = await favoriteVariant.findByIdAndDelete(favoriteVariantId);
//   if (!favoriteVariant) {
//     res.status(404).json({ message: 'not found' });
//   } else {
//     res.status(204).json({ favoriteVariant });
//   }
// };

export default {
  readMyFavoriteVariants,
};
