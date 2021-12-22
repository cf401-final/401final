import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MainContainer = (props) => {
  const location = useLocation();

  let feature;
  if (location.pathname === '/roomchat') {
    feature = 'Room Chat';
  } else if (location.pathname === '/matcher') {
    feature = 'Social Matcher';
  }

  return (
    <>
      <div className="main-container">
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="roomTitle"
        >
          {feature}
        </Typography>
        {props.children}
      </div>
    </>
  );
};

export default MainContainer;
