import 'dotenv/config';

export const envs= {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  NODE_ENV: process.env.NODE_ENV
}