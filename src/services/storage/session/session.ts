import { ISession } from '../../../types/session';
import { connection } from '../connection';

const key = (id: string) => `session:${id}`;

const find = async (id: string): Promise<ISession | null> => {
  const client = await connection.connect();
  const result = await client.get(key(id));

  if (result) {
    return JSON.parse(result);
  }

  return null;
};

const ensure = async (id: string): Promise<ISession> => {
  const session = await find(id);

  if (!session) {
    throw new Error(`session not found: ${id}`);
  }

  return session;
};

const update = async (id: string, session: ISession) => {
  const client = await connection.connect();
  await client.setex(key(id), 300, JSON.stringify(session));
  return ensure(id);
};

export const session = {
  find,
  ensure,
  update
};
