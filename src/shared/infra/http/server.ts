import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import ErrorRecorder from '@shared/errors/ErrorRecorder';
import rateLimiter from './middlewares/RateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(helmet());
app.use(rateLimiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  ErrorRecorder(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
