import R from 'ramda';
import { ISession } from '../types/session';

const init = (id: string): ISession => {
  return {
    id,
    auth: {
      status: 'NONE',
      step: 'NONE',
      currentUser: null,
      initiator: null
    }
  };
};

const update = R.curry((data: Partial<ISession>, session: ISession): ISession => {
  return { ...session, ...data };
});

export const Session = {
  init,
  update
};
