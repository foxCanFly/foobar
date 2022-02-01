import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { Responder } from '../responder';
import { DataStore } from '../../services/data-store';

export const root = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await DataStore.getSession(sessionId);

  if (!session.auth.done) {
    return Responder.authentication(sessionId, queryResult);
  }

  return {};
};
