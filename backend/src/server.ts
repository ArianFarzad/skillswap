import * as http from 'node:http';
import app from './app';
import logger from './utils/logger';
import { connectToDatabase } from './utils/database';
import { env, loadEnv } from './config/config';
import { configureSocket } from './socket';

// Create an HTTP server
const server = http.createServer(app);

// Attach WebSocket server
const io = configureSocket(server);
app.set('socketio', io);

(async () => {
  try {
    loadEnv('');
    await connectToDatabase(env.MONGO_URI!);
    server.listen(8000, () => {
      logger.info('Server is running on port 8000');
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
})();
