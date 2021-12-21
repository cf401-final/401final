import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

export const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
export const SocketContext = createContext();

const SocketProvider = (props) => {
  let [ currentRoom, setCurrentRoom ] = useState('general');

  const values = {
    currentRoom,
    setCurrentRoom,
    socket
  }

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
}

// socket.on('connect', () => {
//   console.log('Connected to Jangle socket server');
// });

export default SocketProvider;

