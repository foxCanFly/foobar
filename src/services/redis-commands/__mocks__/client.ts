import Redis from 'ioredis-mock';
import { once } from 'ramda';

const get = once(async () => {
  return new Redis();
});

export const RedisClient = {
  get
};
