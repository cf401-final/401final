import React, { useContext } from 'react'
import { Typography } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const CurrentRoom = () => {
  const { currentRoom } = useContext(SocketContext);

  return (
    <div>
      <Typography variant="caption" sx={{fontStyle: 'italic'}}>Now talking in: {currentRoom}</Typography>
    </div>
  )
}

export default CurrentRoom;
