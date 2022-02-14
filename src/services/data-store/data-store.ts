import { getRedisClient } from './client';
import { ISession } from '../../types/session';

const keys = {
  session: (id: string) => `session:${id}`
};

const getSession = async (id: string): Promise<ISession | null> => {
  const client = await getRedisClient();
  const result = await client.get(keys.session(id));

  if (result) {
    return JSON.parse(result);
  }

  return null;
};

const setSession = async (id: string, session: ISession) => {
  const client = await getRedisClient();
  return client.setex(keys.session(id), 300, JSON.stringify(session));
};

export const DataStore = {
  getSession,
  setSession
};
