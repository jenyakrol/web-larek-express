import { NextFunction, Request, Response } from 'express';

type RouteFunction = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

const controllerDecorator = (func: RouteFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default controllerDecorator;
