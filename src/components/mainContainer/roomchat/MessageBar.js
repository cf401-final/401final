import React, { useContext } from 'react';
import { Paper, InputBase } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const MessageBar = () => {
  const { socket, currentRoom } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    socket.emit('message', { message, room: currentRoom });

    e.target.message.value = '';
  };

  return (
    <div className="message-bar">
      <Paper
        className="msgPaper"
        onSubmit={handleSubmit}
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#474b52',
        }}
      >
        <InputBase
          className="msgInput"
          name="message"
          sx={{ ml: 1, flex: 1, color: 'white' }}
          placeholder="Message"
          inputProps={{ 'aria-label': 'send message' }}
        />
      </Paper>
    </div>
  );
};

export default MessageBar;
