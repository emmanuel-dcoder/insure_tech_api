import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  server: {
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
  },
};
