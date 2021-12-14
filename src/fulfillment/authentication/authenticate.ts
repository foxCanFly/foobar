import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { SessionService } from '../../services/session';
import { Responder } from '../responder';

export const authentication = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await SessionService.get(sessionId);

  // do some auth stuff

  await SessionService.set(sessionId, { auth: { ...session.auth, done: true } });

  return Responder.root(sessionId, queryResult);
};
