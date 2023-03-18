import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { auth0ManagementApiBaseUrl } from '../config/authConfig';

const userHasPermission = async (userId: string, permission: string) => {
  console.log(`${auth0ManagementApiBaseUrl}/users/${userId}/permissions`);
  const response = await axios.get(`${auth0ManagementApiBaseUrl}/permissions`);
  // also maybe I'm doing axios wrong
  const data = await response.data;

  console.log('Gotten Permissions: ', response.data);
  return data.includes(permission);
};

const userMay = (permissions: Array<string>, customMessage?: string) => function (req: Request, res: Response, next: NextFunction) {
  const { oidc }: any = req;
  const userId = oidc.user.sub;

  if (permissions.every((permission) => userHasPermission(userId, permission))) {
    next();
  }
  res.status(403).json({ message: customMessage ?? 'Forbidden Access' });
};

export default userMay;

// userMay(['read:favoriteRecipes'])]