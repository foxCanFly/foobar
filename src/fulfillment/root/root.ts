import { IFFRequest, IFFResponse } from '../../types/webhook';
import { Responder } from '../responder';
import { Storage } from '../../services/storage';
import { ISession } from '../../types/session';

export const root = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await ensureSessionExist(request);

  // can I use event or action
  if (request.queryResult.queryText === 'WELCOME') {
    return Responder.welcome(request);
  }

  if (session.auth.status !== 'DONE') {
    return Responder.auth(request);
  }

  return {};
};

const ensureSessionExist = async (request: IFFRequest) => {
  const session = await Storage.session.find(request.session);

  if (!session) {
    const data: ISession = {
      id: request.session,
      auth: {
        status: 'NONE',
        step: 'NONE',
        currentUser: null,
        initiator: null
      }
    };

    await Storage.session.update(request.session, data);
  }

  return Storage.session.ensure(request.session);
};
