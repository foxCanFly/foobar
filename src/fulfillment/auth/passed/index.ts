import { IFFRequest, IFFResponse } from '../../../types/webhook';
import { SessionService } from '../../../services/session';

export const passed = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  await SessionService.store({
    ...session,
    auth: { ...session.auth, status: 'DONE', step: 'NONE', currentUser: { id: '1' } }
  });

  return {};
};
