import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { addMessageToRoom } from '../store/rooms';

export const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
export const SocketContext = createContext();

const SocketProvider = (props) => {
  let [currentRoom, setCurrentRoom] = useState('general');

  useEffect(() => {
    socket.on('message', data => {
      props.addMessageToRoom({room: data.room, message: data.message});
    });
  }, [socket]);

  useEffect(() => {
    console.log("STUB")
  }, [setCurrentRoom])

  const values = {
    currentRoom,
    setCurrentRoom,
    socket,
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
};

const mapDispatchToProps = dispatch => ({
  addMessageToRoom: (room) => dispatch(addMessageToRoom(room))
});

export default connect(null, mapDispatchToProps)(SocketProvider);
