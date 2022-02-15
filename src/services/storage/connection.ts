import R from 'ramda';
import Redis from 'ioredis';
import { Environment } from '../environment';
import { Logger } from '../logger';

const connect = R.once(async () => {
  const config = await Environment.config();

  const instance = new Redis({
    port: 6379,
    host: config.REDIS_HOST
  });

  instance.on('error', (...args) => Logger.error(`REDIS error: `, ...args));
  instance.on('warning', (...args) => Logger.warn(`REDIS warning: `, ...args));
  instance.on('reconnecting', () => Logger.warn(`REDIS reconnecting to server...`));
  instance.on('connect', () => Logger.info(`REDIS connected to server...`));

  return instance;
});

export const connection = { connect };
