import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

socket.on('connect', () => {
  console.log('Connected to Jangle socket server');
});

export const SocketContext = createContext();
