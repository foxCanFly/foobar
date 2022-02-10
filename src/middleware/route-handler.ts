import { Request, Response, NextFunction } from 'express';

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const routeHandler = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
