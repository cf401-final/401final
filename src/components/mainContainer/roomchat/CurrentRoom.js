import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
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
      <Typography className="letterSpacing" variant="h6">
        <ArrowBackRoundedIcon id="leftArrow" />Please select a Room.
      </Typography>
    </div>
  );
};

export default CurrentRoom;
