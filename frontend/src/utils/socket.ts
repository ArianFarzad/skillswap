import { io, Socket } from 'socket.io-client';
import log from './loggerInstance.ts';

import { IMessage } from '../models/models.ts';

const socket: Socket = io('http://localhost:8000', {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

export const connectSocket = (sessionId: string): void => {
  socket.connect();
  socket.emit('joinSession', sessionId);

  socket.on('connect', () => {
    log.info('Connected to socket server');
    socket.emit('joinSession', sessionId);
  });
};

export const disconnectSocket = (): void => {
  socket.disconnect();
};

export const sendMessage = (
  sessionId: string,
  senderId: string,
  content: string,
  attachments: { url: string; type: string }[] = []
): void => {
  socket.emit('sendMessage', { sessionId, senderId, content, attachments });
};

export const onNewMessage = (callback: (message: IMessage) => void): void => {
  socket.on('newMessage', callback);
};

export default socket;
