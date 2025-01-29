import { Server } from 'socket.io';
import Session, { IMessage } from './models/Session';
import * as http from 'node:http';
import app from './app';
import logger from './utils/logger';
import { connectToDatabase } from './database';
import { env, loadEnv } from './config/config';

// Create an HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
});

app.set('socketio', io);

io.on('connection', (socket) => {
  socket.on('joinSession', (sessionId) => {
    logger.debug(`Socket ${socket.id} 'joined session ${sessionId}`);
    socket.join(sessionId);
  });

  socket.on('sendMessage', async (data) => {
    const { sessionId, senderId, content } = data;

    logger.info(
      `Received message: Session: ${sessionId}, Sender: ${senderId}, Content: ${content}`
    );

    if (!sessionId || !senderId) {
      logger.error('Session ID or Sender ID is missing');
      return;
    }

    try {
      const session = await Session.findById(sessionId)
        .populate('tutor', 'name')
        .populate('student', 'name');

      if (!session) {
        logger.error('Session not found');
        return;
      }

      const newMessage: IMessage = {
        sender: senderId,
        content,
        timestamp: new Date(),
      };

      session.messages.push(newMessage);
      await session.save();

      // Emit the message to all clients in the session room
      await session.populate('messages.sender', 'name');
      const savedMessage = session.messages[session.messages.length - 1];

      io.to(sessionId).emit('newMessage', savedMessage);
    } catch (error) {
      logger.error(`Error handling message: ${error}`);
    }
  });
});

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
