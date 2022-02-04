import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { Responder } from '../responder';
import { SessionService } from '../../services/session';

export const authentication = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await SessionService.fetch(sessionId);

  // do some authentication stuff

  session.auth.done = true;

  await SessionService.store(session);

  return Responder.root(sessionId, queryResult);
};
