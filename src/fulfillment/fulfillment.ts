import { Request, Response } from 'express';
import { IQueryResult } from '../types/request';
import { Responder } from './responder';

export const fulfillment = async (req: Request, res: Response) => {
  console.log('FF REQ :', req.body);

  const sessionId: string = req.body.session;
  const queryResult: IQueryResult = req.body.queryResult;

  const response = await Responder.root(sessionId, queryResult);

  console.log('FF RES :', response);

  res.status(200).json(response);
};
