import { IAuth } from './auth';

export interface ISession {
  id: string;
  auth: IAuth;
  ANI?: string;
}
