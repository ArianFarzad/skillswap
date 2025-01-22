import dotenv from 'dotenv';

export const loadEnv = (path: string) => {
  dotenv.config({ path });
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error('Missing necessary environment variables.');
  }
};

export type ENV = {
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
};

export const env: ENV = {
  get NODE_ENV() {
    return process.env.NODE_ENV ?? 'development';
  },
  get MONGO_URI() {
    return process.env.MONGO_URI!;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET!;
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET!;
  },
  get EMAIL_USER() {
    return process.env.EMAIL_USER ?? '';
  },
  get EMAIL_PASS() {
    return process.env.EMAIL_PASS ?? '';
  },
};
