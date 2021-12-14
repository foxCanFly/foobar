import { RedisClient } from './client';

export class RedisCommands {
  static async get(key: string) {
    try {
      const client = await RedisClient.get();
      return client.get(key);
    } catch (error) {
      console.log('REDIS-COMMANDS [GET] ERROR: ', error);
      return null;
    }
  }

  static async set(key: string, value: string, expiry?: number) {
    try {
      const client = await RedisClient.get();

      if (expiry) {
        await client.setex(key, expiry, value);
      } else {
        await client.set(key, value);
      }

      return RedisCommands.get(key);
    } catch (error) {
      console.log('REDIS-COMMANDS [SET] ERROR: ', error);
      return null;
    }
  }
}
