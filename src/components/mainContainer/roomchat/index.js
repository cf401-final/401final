import React from 'react';
import MessageStream from './MessageStream';
import MessageBar from './MessageBar';
import CurrentRoom from './CurrentRoom';

const Roomchat = () => {
  return (
    <>
      <div className="roomchat-container">
        <CurrentRoom />
        <MessageStream />
      </div>
      <MessageBar />
    </>
  );
};

export default Roomchat;
