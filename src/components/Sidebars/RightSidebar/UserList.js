import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../../../context/socket';
import RoomUser from './RoomUser';
import { Typography, Divider, Box } from '@mui/material';

const UserList = () => {
  const { socket, currentRoom } = useContext(SocketContext);
  const [ loggedInUsers, setLoggedInUsers ] = useState(null);

  useEffect(() => {
    socket.emit('get-users-for-room', {room: currentRoom});
    socket.on('get-users-for-room', ({ users }) => {
      setLoggedInUsers([...users]);
    });
  }, [socket, currentRoom]);

  return (
    <Box>
      <Typography>users chatting in {currentRoom}:</Typography>
      <Divider style={{ backgroundColor: '#99aab5', margin: '5px 0px 15px 0px' }}/>
      {loggedInUsers && loggedInUsers.map(([username], idx) => {
        return <RoomUser username={username} key={idx} />
      })}
    </Box>
  )
}

export default UserList;
