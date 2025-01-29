import { io, Socket } from 'socket.io-client';

import { IMessage } from '../models/models.ts';

const socket: Socket = io('http://localhost:8000', {
  autoConnect: false,
});

export const connectSocket = (sessionId: string): void => {
  socket.connect();
  socket.emit('joinSession', sessionId);
};

export const disconnectSocket = (): void => {
  socket.disconnect();
};

export const sendMessage = (
  sessionId: string,
  senderId: string,
  content: string
): void => {
  socket.emit('sendMessage', { sessionId, senderId, content });
};

export const onNewMessage = (callback: (message: IMessage) => void): void => {
  socket.on('newMessage', callback);
};

export default socket;
