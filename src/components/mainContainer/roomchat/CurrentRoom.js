import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { SocketContext } from '../../../context/socket';

const CurrentRoom = () => {
  const { currentRoom } = useContext(SocketContext);

  if(currentRoom) {
    return (
      <div>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Now talking in: {currentRoom}
        </Typography>
      </div>
    );
  } 
  return (
    <div>
      <Typography variant="h4">
        Please select a Room from the menu on the left
      </Typography>
    </div>
  );
};

export default CurrentRoom;
