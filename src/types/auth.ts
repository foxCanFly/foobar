import { IUser } from './user';
import { IFFRequest } from './webhook';

export type IStatus = 'NONE' | 'PROGRESS' | 'DONE';
export type IStep = 'NONE' | 'PASSED';

export type IAuth = {
  status: IStatus;
  step: IStep;
  initiator: IFFRequest | null;
  currentUser: IUser | null;
  data: Record<string, unknown>;
};
