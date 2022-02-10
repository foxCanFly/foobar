import { IFFRequest, IFFResponse } from '../../types/webhook';
import { Responder } from '../responder';
import { SessionService } from '../../services/session';
import { Auth } from '../../models/auth';

export const root = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  if (!Auth.isDone(session.auth)) {
    return Responder.auth(request);
  }

  return {};
};
