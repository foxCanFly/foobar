import R from 'ramda';
import { Environment } from '../environment';
import Redis from 'ioredis';

export const client = R.once(async () => {
  const config = await Environment.config();

  const instance = new Redis({
    port: 6379,
    host: config.REDIS_HOST,
    connectTimeout: 1000,
    showFriendlyErrorStack: true,
    maxRetriesPerRequest: 0,
    autoResubscribe: false,
    lazyConnect: true
  });

  instance.on('error', (...args) => console.error(`REDIS error: `, ...args));
  instance.on('warning', (...args) => console.warn(`REDIS warning: `, ...args));
  instance.on('reconnecting', () => console.warn(`REDIS reconnecting to server...`));
  instance.on('connect', () => console.log(`REDIS connected to server...`));

  return instance;
});
