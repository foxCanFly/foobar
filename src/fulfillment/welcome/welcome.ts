import R from 'ramda';
import { IFFRequest, IFFResponse } from '../../types/webhook';
import { SessionService } from '../../services/session';

export const welcome = async (request: IFFRequest): Promise<IFFResponse> => {
  const session = await SessionService.fetch(request.session);

  const ANI = R.pipe(
    R.pathOr('', ['originalDetectIntentRequest', 'payload', 'channelContext', 'from']),
    R.replace('+1', '')
  )(request);

  await SessionService.store({
    ...session,
    ANI
  });

  prefetch(request).then();

  return {
    fulfillmentText: ''
  };
};

const prefetch = async (request: IFFRequest) => {
  //
};
