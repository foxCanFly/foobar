import R from 'ramda';
import { IFFRequest, IFFResponse } from '../../types/webhook';
import { Responder } from '../responder';
import { SessionService } from '../../services/session';
import { Session } from '../../models/session';

export const auth = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  const step = session.auth.step;

  if (step === 'NONE') {
    await R.pipe(
      Session.update({
        auth: { ...session.auth, step: 'PASSED', initiator: request, data: { ...session.auth.data, phoneNumber: '' } }
      }),
      SessionService.store
    )(session);

    return Responder.auth(request);
  }

  if (step === 'PASSED') {
    await R.pipe(
      Session.update({ auth: { ...session.auth, status: 'DONE', step: 'NONE', currentUser: { id: '' } } }),
      SessionService.store
    )(session);

    return {};
  }

  return {};
};
