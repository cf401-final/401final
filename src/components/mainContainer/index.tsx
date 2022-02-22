import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps): JSX.Element => {
  const location: Location = useLocation();

  let feature: string = '';
  if (location.pathname === '/profile') {
    feature = '';
  } else if (location.pathname === '/roomchat') {
    feature = 'Room Chat';
  } else if (location.pathname === '/matcher') {
    feature = '';
  }

  return (
    <>
      <div
       data-testid="main-container"
        className={
          location.pathname !== '/matcher'
            ? 'main-container'
            : 'main-container-matcher'
        }
      >
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="roomTitle"
        >
          {feature}
        </Typography>
        {children}
      </div>
    </>
  );
};

export default MainContainer;
