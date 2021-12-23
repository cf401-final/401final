import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';
import { connect } from 'react-redux';

const MessageStream = (props) => {
  const { socket, currentRoom } = useContext(SocketContext);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    function listener() {
      setMessages(props.rooms.get(currentRoom));
    }
    socket.on('message', listener);

    return function cleanup() {
      socket.off('message', listener);
    };
  }, [socket, props.rooms, messages, currentRoom]);

  useEffect(() => {
    if (props.rooms.has(currentRoom)) {
      setMessages(props.rooms.get(currentRoom));
    }
  }, [currentRoom, props.rooms]);

  return (
    <>
      {messages.length >= 1 && (
        <div className="message-container">
          {/* <p className="theirChatMessage">TEXT</p> */}
          {messages.map((msg, idx) => {
            return (
              <p className="myChatMessage" key={idx}>
                {`${msg}`}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms,
  };
};

export default connect(mapStateToProps)(MessageStream);
