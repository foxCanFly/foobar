import { client } from './client';

const keys = {
  session: (id: string) => `session:${id}`
};

const getSession = async (id: string) => {
  const _client = await client();
  return _client.get(keys.session(id));
};

const setSession = async (id: string, data: string) => {
  const _client = await client();
  return _client.setex(keys.session(id), 300, data);
};

export const DataStore = {
  getSession,
  setSession
};
