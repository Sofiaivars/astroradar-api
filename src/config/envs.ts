import 'dotenv/config';

export const envs= {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  SECRET_JWT_KEY: process.env.SECRET_JWT_KEY,
  N2YO_API_KEY: process.env.N2YO_API_KEY,
  NODE_ENV: process.env.NODE_ENV
}