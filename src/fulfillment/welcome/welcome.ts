import R from 'ramda';
import { IFFRequest, IFFResponse } from '../../types/webhook';
import { Storage } from '../../services/storage';

export const welcome = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await Storage.session.ensure(request.session);

  const ANI = R.pipe(
    R.pathOr('', ['originalDetectIntentRequest', 'payload', 'channelContext', 'from']),
    R.replace('+1', '')
  )(request);

  await Storage.session.update(session.id, {
    ...session,
    ANI
  });

  prefetch(request).then();

  return {};
};

const prefetch = async (request: IFFRequest) => {
  //
};
