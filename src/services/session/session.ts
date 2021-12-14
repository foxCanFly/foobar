import { ISession } from '../../types/session';
import { RedisCommands } from '../redis-commands';

export class SessionService {
  static key(id: string) {
    return `session:${id}`;
  }

  static async get(sessionId: string): Promise<ISession> {
    const key = SessionService.key(sessionId);
    const data = await RedisCommands.get(key);

    if (data) {
      return JSON.parse(data);
    }

    return { id: sessionId, auth: { done: false } };
  }

  static async set(sessionId: string, data: Partial<ISession>) {
    const key = SessionService.key(sessionId);
    const session = await SessionService.get(key);
    await RedisCommands.set(key, JSON.stringify({ ...session, ...data }), 300);
  }
}
