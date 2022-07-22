import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(`${process.env.ENV}|${key}`, JSON.stringify(value));
  }

  public async retrieve<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(`${process.env.ENV}|${key}`);

    if (!data) {
      return undefined;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(`${process.env.ENV}|${key}`);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${process.env.ENV}|${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
