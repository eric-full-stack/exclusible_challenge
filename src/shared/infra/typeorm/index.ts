import { DataSource } from 'typeorm';
import 'dotenv/config';

const OrmConnection = new DataSource({
  type: 'postgres',
  host: `${process.env.TYPEORM_HOST}`,
  port: Number(process.env.TYPEORM_PORT),
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: [`${process.env.TYPEORM_ENTITIES}`],
  migrations: [`${process.env.TYPEORM_MIGRATIONS}`],
  cache: {
    duration: 15000, // 15 seconds
    type: 'ioredis',
    options: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  },
});

export default OrmConnection;

OrmConnection.initialize();
