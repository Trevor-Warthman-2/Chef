import { Request, Response, NextFunction } from 'express';

export const requireAuthenticated = (customMessage?: string) => function (req: Request, res: Response, next: NextFunction) {
  const { oidc }: any = req;
  if (!oidc.isAuthenticated()) {
    res.status(401).json({ message: customMessage ?? 'Login Required' });
  } else {
    next();
  }
};
