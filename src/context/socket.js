import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { addMessageToRoom } from '../store/actions';

export const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
export const SocketContext = createContext(null);

const SocketProvider = (props) => {
  let [currentRoom, setCurrentRoom] = useState();

  useEffect(() => {
    function listener(data) {
      props.addMessageToRoom(data);
    }
    socket.on('message', listener);

    return function cleanup() {
      socket.off('message', listener);
    };
  }, [props]);

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

const mapDispatchToProps = (dispatch) => ({
  addMessageToRoom: (room) => dispatch(addMessageToRoom(room)),
});

export default connect(null, mapDispatchToProps)(SocketProvider);
