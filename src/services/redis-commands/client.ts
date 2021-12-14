import Redis from 'ioredis';
import { once } from 'ramda';
import { Environment } from '../../environment';

const get = once(async () => {
  const config = await Environment.config();

  const client = new Redis({
    port: 6379,
    host: config.REDIS_HOST,
    connectTimeout: 1000,
    showFriendlyErrorStack: true,
    maxRetriesPerRequest: 0,
    autoResubscribe: false,
    lazyConnect: true
  });

  client.on('error', (error: Error) => {
    console.log('REDIS ERROR: ', error);
  });

  return client;
});

export const RedisClient = {
  get
};
