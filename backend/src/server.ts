import { Server } from 'socket.io';
import Session, { IMessage } from './models/Session';
import * as http from 'node:http';
import app from './app';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
});

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinSession', (sessionId) => {
    console.log(`User ${socket.id} 'joined session ${sessionId}`);
    socket.join(sessionId);
  });

  socket.on('sendMessage', async (data) => {
    const { sessionId, senderId, content } = data;

    console.log('Received message:', { sessionId, senderId, content });

    if (!sessionId || !senderId) {
      console.error('Session ID or Sender ID is missing');
      return;
    }

    try {
      const session = await Session.findById(sessionId);
      if (!session) {
        console.error('Session not found');
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
      const savedMessage = session.messages[session.messages.length - 1];
      io.to(sessionId).emit('newMessage', savedMessage);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
});

server.listen(8000, () => {
  console.log('Server läuft auf Port 8000');
});
