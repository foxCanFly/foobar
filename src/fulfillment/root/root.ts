import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { SessionService } from '../../services/session';
import { Responder } from '../responder';

export const root = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await SessionService.get(sessionId);

  if (!session.auth.done) {
    return Responder.authentication(sessionId, queryResult);
  }

  return {};
};
