import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

interface IMiddleware {
  (request: Request, response: Response, next: NextFunction): void;
}

export default function hasRole(roles: IUserType[]): IMiddleware {
  return (request: Request, response: Response, next: NextFunction) => {
    if (roles.indexOf(request.user.type) !== -1) {
      return next();
    }

    throw new AppError("You're not allowed to access this route");
  };
}
