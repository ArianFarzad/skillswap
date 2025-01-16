import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error('Missing necessary environment variables.');
}

export type ENV = {
  MONGO_URI: string;
  JWT_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
};

export const env: ENV = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER ?? '',
  EMAIL_PASS: process.env.EMAIL_PASS ?? '',
};
