import dotenv from 'dotenv';
import { once } from 'ramda';

dotenv.config();

const config = once(async () => {
  const PORT = Number(process.env.PORT || '3001');
  const NODE_ENV = mandatory('NODE_ENV', process.env.NODE_ENV);

  const API_URL = await runtime('API_URL');
  const REDIS_HOST = await runtime('REDIS_HOST');

  return {
    PORT,
    NODE_ENV,
    API_URL: mandatory('API_URL', API_URL),
    REDIS_HOST: mandatory('REDIS_HOST', REDIS_HOST)
  };
});

const mandatory = (key: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`missing mandatory variable: ${key}`);
  }

  return value;
};

const runtime = (key: string) => {
  const NODE_ENV = mandatory('NODE_ENV', process.env.NODE_ENV);

  if (NODE_ENV === 'development') {
    return process.env[key];
  }

  return Promise.resolve(`secret:${key}`);
};

export const Environment = {
  config
};
