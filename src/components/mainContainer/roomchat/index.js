import React from 'react';
import MessageStream from './MessageStream';
import MessageBar from './MessageBar';

const Roomchat = () => {
  return (
    <div className="roomchat-container">
      <MessageStream />

      <MessageBar />
    </div>
  );
};

export default Roomchat;
