import React, { useEffect, useContext } from 'react';
import { TextField } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const MessageBar = ({ addMessage }) => {
  const socket = useContext(SocketContext);

  useEffect(() => { 
    socket.emit('join', {room : 'general', user: 'test'});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    socket.emit('message', { message, room: 'general' });
    addMessage(message)
    e.target.message.value = '';
  }

  return (
    <div className="message-bar">
      MESSAGE BAR
      <form onSubmit={handleSubmit}>
        <TextField name="message" variant="standard" />
      </form>
    </div>
  )
}

export default MessageBar;
