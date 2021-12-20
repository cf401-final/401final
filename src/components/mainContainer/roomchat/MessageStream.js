import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';

const Roomchat = () => {
  const socket = useContext(SocketContext);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data.message]);
    });
  }, [socket]);

  console.log(messages, 'messages');
  return (
    <>
      {messages.length >= 1 && (
        <div className="message-container">
          {messages.map((msg, idx) => {
            return <p key={idx}>{`${msg}`}</p>;
          })}
        </div>
      )}
    </>
  );
};

export default Roomchat;
