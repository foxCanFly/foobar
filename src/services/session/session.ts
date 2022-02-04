import { DataStore } from '../data-store';
import { ISession } from '../../types/session';
import { Session } from '../../models/session';

const fetch = async (id: string): Promise<Session> => {
  const data = await DataStore.getSession(id);

  const session = new Session(id);

  if (!data) {
    return session;
  }

  session.auth = data.auth;

  return session;
};

const store = async (session: Session): Promise<void> => {
  const data: ISession = {
    id: session.id,
    auth: session.auth
  };

  await DataStore.setSession(session.id, data);
};

export const SessionService = {
  fetch,
  store
};
