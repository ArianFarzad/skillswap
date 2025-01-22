import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { loadEnv } from '../config/config';

export const setupTestDB = (dotenvPath: string) => {
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    loadEnv(dotenvPath);
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    await mongoose.connect(uri);

    await mongoose.connection.db?.dropDatabase(); // Ensure a clean slate
    await mongoose.connection.syncIndexes(); // Sync all schema indexes
  });

  beforeEach(async () => {
    await mongoose.disconnect();
    const uri = mongoMemoryServer.getUri();
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoMemoryServer.stop();
  });
};
