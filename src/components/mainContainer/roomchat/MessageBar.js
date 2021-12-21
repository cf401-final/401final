import React, { useEffect, useContext } from 'react';
import { Paper, InputBase } from '@mui/material';
import { SocketContext } from '../../../context/socket';
import { useAuth0 } from '@auth0/auth0-react';

const MessageBar = () => {
  const { socket, currentRoom } = useContext(SocketContext);
  const { isAuthenticated, user } = useAuth0();

  let username = isAuthenticated
    ? user.nickname
    : `Test-User#${Math.round(Math.random() * 1000)}`;

  useEffect(() => {
    socket.emit('join', {
      room: 'general',
      username,
    });
  }, [socket, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    socket.emit('message', { message, room: currentRoom });

    e.target.message.value = '';
  };

  return (
    <div className="message-bar">
      {/* <form> */}
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
      {/* <TextField className="msgInput" name="message" variant="standard" /> */}
      {/* </form> */}
    </div>
  );
};

export default MessageBar;
