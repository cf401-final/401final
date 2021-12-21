import React from 'react';
import { Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div id="landing">
      <h1>Welcome to Jangle.</h1>
      {isAuthenticated ? (
        <Link to="/roomchat">Start Chatting</Link>
      ) : (
        <Typography>
          Please <a onClick={loginWithRedirect}>sign in</a> or{' '}
          <a onClick={loginWithRedirect}>register</a> to continue.
        </Typography>
      )}
    </div>
  );
};

export default Landing;
