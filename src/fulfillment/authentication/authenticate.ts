import { IQueryResult } from '../../types/request';
import { IResponse } from '../../types/response';
import { Responder } from '../responder';
import { DataStore } from '../../services/data-store';

export const authentication = async (sessionId: string, queryResult: IQueryResult): Promise<IResponse> => {
  const session = await DataStore.getSession(sessionId);

  // do some authentication stuff

  await DataStore.setSession(sessionId, { auth: { ...session.auth, done: true } });

  return Responder.root(sessionId, queryResult);
};
