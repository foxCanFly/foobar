import { ISession } from '../../types/session';
import { Session } from '../../models/session';
import { DataStore } from '../data-store';

const fetch = async (id: string): Promise<ISession> => {
  const session = await DataStore.getSession(id);

  if (session) {
    return session;
  }

  return Session.init(id);
};

const store = async (session: ISession): Promise<ISession> => {
  await DataStore.setSession(session.id, session);
  return fetch(session.id);
};

export const SessionService = {
  fetch,
  store
};
