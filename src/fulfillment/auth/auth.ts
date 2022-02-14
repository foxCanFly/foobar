import { IFFRequest, IFFResponse } from '../../types/webhook';
import { SessionService } from '../../services/session';
import { Responder } from './responder';

export const auth = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  if (session.auth.step === 'NONE') {
    return Responder.none(request);
  }

  if (session.auth.step === 'PASSED') {
    return Responder.passed(request);
  }

  return {};
};
