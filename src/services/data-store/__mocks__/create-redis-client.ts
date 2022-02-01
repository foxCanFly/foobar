import Redis from 'ioredis-mock';
import { once } from 'ramda';

export const createRedisClient = once(async () => {
  return new Redis();
});
