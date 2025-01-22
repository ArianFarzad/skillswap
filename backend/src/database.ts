import mongoose from 'mongoose';
import logger from './utils/logger';

export const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};
