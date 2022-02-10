import { NextFunction, Request, Response } from 'express';
import { Logger } from '../services/logger';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    Logger.error(error);
    res.status(200).json({});
  } else {
    next();
  }
};
