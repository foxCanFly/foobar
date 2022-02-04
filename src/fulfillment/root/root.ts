import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { Responder } from '../responder';
import { SessionService } from '../../services/session';

export const root = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await SessionService.fetch(sessionId);

  if (!session.auth.done) {
    return Responder.authentication(sessionId, queryResult);
  }

  return {};
};
