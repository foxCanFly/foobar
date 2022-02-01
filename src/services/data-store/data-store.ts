import { ISession } from '../../types/session';
import { createRedisClient } from './create-redis-client';

const keys = {
  session: (id: string) => `session:${id}`
};

const setSession = async (id: string, data: Partial<ISession>): Promise<void> => {
  const client = await createRedisClient();

  const session = await getSession(id);

  await client.setex(
    keys.session(id),
    300,
    JSON.stringify({
      ...session,
      ...data
    })
  );
};

const getSession = async (id: string): Promise<ISession> => {
  const client = await createRedisClient();

  const session = await client.get(keys.session(id));

  if (!session) {
    return { id, auth: { done: false } };
  }

  return JSON.parse(session);
};

export const DataStore = {
  setSession,
  getSession
};
