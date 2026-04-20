import { io, type Socket } from 'socket.io-client';
import { env } from '@/config/env';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(env.socketUrl, {
    transports: ['websocket'],
    auth: { token },
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
