import { IAuth } from '../types/auth';

const isDone = (auth: IAuth): boolean => {
  return auth.status === 'DONE';
};

export const Auth = {
  isDone
};
