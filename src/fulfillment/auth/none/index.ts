import { IFFRequest, IFFResponse } from '../../../types/webhook';
import { SessionService } from '../../../services/session';
import { Responder } from '../../responder';

export const none = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  await SessionService.store({
    ...session,
    auth: { ...session.auth, step: 'PASSED', initiator: request }
  });

  return Responder.auth(request);
};
