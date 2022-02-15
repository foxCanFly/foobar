import { IFFRequest, IFFResponse } from '../../types/webhook';
import { Responder } from './responder';
import { Storage } from '../../services/storage';

export const auth = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await Storage.session.ensure(request.session);

  if (session.auth.step === 'NONE') {
    return Responder.none(request);
  }

  if (session.auth.step === 'PASSED') {
    return Responder.passed(request);
  }

  return {};
};
