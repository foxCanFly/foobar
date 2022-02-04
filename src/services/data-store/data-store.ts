import { ISession } from '../../types/session';
import { createRedisClient } from './create-redis-client';

const keys = {
  session: (id: string) => `session:${id}`
};

const setSession = async (id: string, data: ISession): Promise<void> => {
  const client = await createRedisClient();

  await client.setex(keys.session(id), 300, JSON.stringify(data));
};

const getSession = async (id: string): Promise<ISession | null> => {
  const client = await createRedisClient();

  const session = await client.get(keys.session(id));

  if (!session) {
    return null;
  }

  return JSON.parse(session);
};

export const DataStore = {
  setSession,
  getSession
};
