import 'dotenv/config';

export const envs= {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV
}