import React from 'react';
import { Typography } from '@mui/material';

const MainContainer = ({ children }) => {
  return (
    <>
      <div className="main-container">
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="roomTitle"
          sx={{ ml: 1 }}
        >
          Name of Chat Room / Feature
        </Typography>
        {children}
      </div>
    </>
  );
};

export default MainContainer;
