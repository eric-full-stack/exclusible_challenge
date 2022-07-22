import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'cache',
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 6,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch {
    throw new AppError('Too many requests', 429);
  }
}
