import { IFFRequest, IFFResponse } from '../../../types/webhook';
import { Responder } from '../../responder';
import { Storage } from '../../../services/storage';

export const none = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await Storage.session.ensure(request.session);

  await Storage.session.update(session.id, {
    ...session,
    auth: { ...session.auth, step: 'PASSED', initiator: request }
  });

  return Responder.auth(request);
};
