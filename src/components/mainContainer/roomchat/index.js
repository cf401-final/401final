import React, { useState } from 'react'
import MessageBar from './MessageBar';

const Roomchat = () => {
  let [ messages, setMessages ] = useState([]);

  const addMessage = (msg) => {
    setMessages([...messages, msg]);
  }

  return (
    <div className="roomchat-container">
      <div className="message-container">
        {messages.map((msg, idx) => {
          return <p key={idx}>{`${msg}`}</p>
        })}
      </div>

      <MessageBar addMessage={addMessage} />
    </div>
  )
}

export default Roomchat;
