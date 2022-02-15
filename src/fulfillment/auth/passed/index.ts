import { IFFRequest, IFFResponse } from '../../../types/webhook';
import { Storage } from '../../../services/storage';

export const passed = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await Storage.session.ensure(request.session);

  await Storage.session.update(request.session, {
    ...session,
    auth: { ...session.auth, status: 'DONE', step: 'NONE', currentUser: { id: '1' } }
  });

  return {};
};
