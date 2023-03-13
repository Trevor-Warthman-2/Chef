import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { auth0ManagementApiBaseUrl } from '../config/authConfig';

const userHasPermission = async (userId: string, permission: string) => {
  console.log(`${auth0ManagementApiBaseUrl}/users/${userId}/permissions`);
  const response = await axios.get(`${auth0ManagementApiBaseUrl}/permissions`);
  THIS HERE IS NOT WORKING BECAUSE IN THE BROWSER/POSTMAN I CAN MANUALLY SET THE MANAGEMENT API TOKEN but here I don't have it. So I should grab it and have it. Look how to get api management token in node js. There was some sort of production link.
  also maybe I'm doing axios wrong
  HERE:
  //https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production
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
