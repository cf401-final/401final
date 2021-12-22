import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';
import { connect } from 'react-redux';

const MessageStream = (props) => {
  const { socket, currentRoom } = useContext(SocketContext);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', () => {
      setMessages(props.rooms.get(currentRoom));
    })
  }, [socket, props.rooms, messages]);

  useEffect(() => {
    if(props.rooms.has(currentRoom)) {
      setMessages(props.rooms.get(currentRoom));
    }
  }, [currentRoom]);

  return (
    <>
      {messages.length >= 1 && (
        <div className="message-container">
          {/* <p className="theirChatMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!</p> */}
          {messages.map((msg, idx) => {
            return (
              <p className="myChatMessage" key={idx}>
                {`${msg}`}
              </p>
            );
          })}
          {/* <p className="theirChatMessage">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!</p> */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms.rooms
  }
};

export default connect(mapStateToProps)(MessageStream);
