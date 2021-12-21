import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';

const Roomchat = () => {
  const { socket } = useContext(SocketContext);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('MESSAGE SENT');
      setMessages((messages) => [...messages, data.message]);
    });
  }, [socket]);

  console.log(messages, 'messages');
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

export default Roomchat;
