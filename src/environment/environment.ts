import dotenv from 'dotenv';
import { once } from 'ramda';

dotenv.config();

export class Environment {
  static config = once(async () => {
    const isDev = process.env.NODE_ENV === 'development';

    const PORT = Number(Environment.runtime('PORT', '3001'));
    const NODE_ENV = Environment.runtime('NODE_ENV');
    const API_URL = isDev ? Environment.runtime('API_URL') : await Environment.secret('API_URL');
    const REDIS_HOST = isDev ? Environment.runtime('REDIS_HOST') : await Environment.secret('REDIS_HOST');

    return {
      PORT,
      API_URL,
      NODE_ENV,
      REDIS_HOST
    };
  });

  static runtime = (key: string, fallback?: string) => {
    const value = process.env[key] || fallback;

    if (!value) {
      throw new Error(`missing runtime variable: ${key}`);
    }

    return value;
  };

  static secret = (key: string) => {
    return Promise.resolve(`secret:${key}`);
  };
}
