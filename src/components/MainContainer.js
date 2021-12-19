import React from 'react';
import Paper from '@mui/material/Paper';

const MainContainer = (props) => {
  return (
    <div>
      <Paper sx={{ flexGrow: 1 }} className="main-container">{props.children}</Paper>
    </div>
  );
}

export default MainContainer;
