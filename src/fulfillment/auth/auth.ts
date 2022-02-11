import { IFFRequest, IFFResponse } from '../../types/webhook';
import { SessionService } from '../../services/session';
import { Steps } from './steps';

export const auth = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  if (session.auth.step === 'NONE') {
    return Steps.none(request);
  }

  if (session.auth.step === 'PASSED') {
    return Steps.passed(request);
  }

  return {};
};
