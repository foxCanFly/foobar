import { Request, Response } from 'express';
import { IFFRequest, IFFResponse } from '../types/webhook';
import { Responder } from './responder';

type IRequest = Request<unknown, unknown, IFFRequest>;
type IResponse = Response<IFFResponse>;

export const fulfillment = async (req: IRequest, res: IResponse) => {
  const request = req.body;
  const response = await Responder.root(request);

  res.status(200).json(response);
};
