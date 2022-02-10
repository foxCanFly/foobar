import { ISession } from '../../types/session';
import { Session } from '../../models/session';
import { DataStore } from '../data-store';

const fetch = async (id: string): Promise<ISession> => {
  const session = await DataStore.getSession(id);

  if (!session) {
    return Session.init(id);
  }

  return JSON.parse(session);
};

const store = async (session: ISession): Promise<void> => {
  await DataStore.setSession(session.id, JSON.stringify(session));
};

export const SessionService = {
  fetch,
  store
};
