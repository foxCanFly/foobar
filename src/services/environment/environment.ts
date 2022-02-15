import dotenv from 'dotenv';
import { once } from 'ramda';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

dotenv.config();

const secrets = new SecretManagerServiceClient();

const config = once(async () => {
  const PORT = Number(process.env.PORT || '3000');
  const NODE_ENV = mandatory('NODE_ENV', process.env.NODE_ENV);

  const API_URL = '/'; // await runtime('API_URL');
  const REDIS_HOST = '127.0.0.1'; // await runtime('REDIS_HOST');

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

const runtime = async (name: string) => {
  const NODE_ENV = mandatory('NODE_ENV', process.env.NODE_ENV);

  if (NODE_ENV === 'development') {
    return process.env[name];
  }

  const [version] = await secrets.accessSecretVersion({
    name: `projects/homeserve-cca-us-${NODE_ENV}/secrets/${name}/versions/latest`
  });

  if (version.payload && version.payload.data) {
    return version.payload.data.toString();
  }
};

export const Environment = {
  config
};
