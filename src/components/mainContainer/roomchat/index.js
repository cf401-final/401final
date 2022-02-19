import React, { useEffect, useContext } from 'react';
import MessageStream from './MessageStream';
import MessageBar from './MessageBar';
import CurrentRoom from './CurrentRoom';
import { SocketContext } from '../../../context/socket';

const Roomchat = ({ rooms }) => {
  const { currentRoom } = useContext(SocketContext) || { currentRoom: null };

  const scrollOnNewMessage = function() {
    const container = document.querySelector('.roomchat-container');
    window.setTimeout(function() {
      container.scrollTop = container.scrollHeight;
    }, 100);
    container.scroll({ top: container.scrollTop });
  }

  useEffect(() => {
    const container = document.querySelector('.roomchat-container');

    const observer = new ResizeObserver(function() {
      container.scroll({ top: container.scrollHeight });
    });

    for (var i = 0; i < container.children.length; i++) {
      observer.observe(container.children[0]);
    }
    return () => observer.disconnect();
  }, [currentRoom])

  return (
    <>
      <div className="roomchat-container" data-testid="roomchat-container">
        <CurrentRoom />
        <MessageStream />
      </div>
      <MessageBar scrollOnNewMessage={scrollOnNewMessage} />
    </>
  );
};

export default Roomchat;

