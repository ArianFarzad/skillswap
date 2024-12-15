import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Message from './models/Message';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Fügen Sie hier beide URLs hinzu
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
});

io.on('connection', (socket) => {
  console.log('Benutzer verbunden:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, content } = data;

    // Nachricht in der Datenbank speichern
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      timestamp: new Date(),
    });
    await message.save();

    // Nachricht an den Empfänger senden
    io.to(receiverId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Benutzer getrennt:', socket.id);
  });
});

httpServer.listen(8000, () => {
  console.log('Server läuft auf Port 8000');
});