import React, { useEffect, useContext } from 'react';
import { Paper, InputBase } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const MessageBar = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('join', { room: 'general', user: 'test' });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    socket.emit('message', { message, room: 'general' });

    e.target.message.value = '';
  };

  return (
    <div className="message-bar">
      {/* <form> */}
      <Paper
        className="msgPaper"
        onSubmit={handleSubmit}
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#474b52' }}
      >
        <InputBase
          className="msgInput"
          name="message"
          sx={{ ml: 1, flex: 1, color: 'white' }}
          placeholder="Message"
          inputProps={{ 'aria-label': 'send message' }}
        />
      </Paper>
      {/* <TextField className="msgInput" name="message" variant="standard" /> */}
      {/* </form> */}
    </div>
  );
};

export default MessageBar;
