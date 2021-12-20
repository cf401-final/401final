import React, { useState, useEffect, useContext } from 'react';
import { TextField } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const MessageBar = () => {
  let [ message, setMessage ] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => { 
    socket.emit('join', {room : 'general', user: 'a b smooth'});
    socket.on('message', data => {
      console.log("FROM SERVER: ", data);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target.message.value);
    e.target.message.value = '';
    socket.emit('message', message);
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
