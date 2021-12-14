import { Request, Response, NextFunction } from 'express';

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const errorHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch((error: Error) => {
    console.log('ERROR: ', error);
    next(error);
  });
};

export default errorHandler;
