import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
});

io.on('connection', (socket) => {
  console.log('Benutzer verbunden:', socket.id);

  // TODO implement emit on new message, 16-01-2025, yb

  // socket.on('sendMessage', async (data) => {
  //   const { senderId, receiverId, content } = data;
  //   console.log('Empfangene Nachricht:', { senderId, receiverId, content });
  //
  //   // Überprüfen Sie, ob senderId und receiverId definiert sind
  //   if (!senderId || !receiverId) {
  //     console.error('SenderId oder ReceiverId ist undefined');
  //     return;
  //   }
  //
  //   // Nachricht in der Datenbank speichern
  //   try {
  //     const message = new Message({
  //       sender: senderId,
  //       receiver: receiverId,
  //       content,
  //       timestamp: new Date(),
  //     });
  //     await message.save();
  //
  //     // Nachricht an den Empfänger senden
  //     io.to(receiverId).emit('receiveMessage', message);
  //   } catch (error) {
  //     console.error('Fehler beim Speichern der Nachricht:', error);
  //   }
  // });
});

httpServer.listen(8000, () => {
  console.log('Server läuft auf Port 8000');
});
