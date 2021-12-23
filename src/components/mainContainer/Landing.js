import React from 'react';
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7289da',
    },
  },
});

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div id="landing">
      <ThemeProvider theme={theme}>
        <h1>Welcome to Jangle.</h1>
        {isAuthenticated ? (
          <>
            <Typography variant="h6">
              <p>Let&apos;s get started! What would you like to do?</p>
            </Typography>
            <Link to="/profile">
              <Button
                className="landBtn"
                size="large"
                variant="contained"
                color="primary"
                endIcon={<AccountCircleIcon />}>Update Profile
              </Button>
            </Link>
            <Link to="/roomchat">
              <Button
                className="landBtn"
                size="large"
                variant="contained"
                color="primary"
                endIcon={<ChatOutlinedIcon />}>Start Chatting
              </Button>
            </Link>
            <Link to="/matcher">
              <Button
                className="landBtn"
                size="large"
                variant="contained"
                color="primary"
                endIcon={<SentimentVerySatisfiedIcon />}>Find Matches
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h5">
              A place where you can find your community and connect with others.
            </Typography>
            <Typography>
              Please <a onClick={loginWithRedirect}>sign in</a> or{' '}
              <a onClick={loginWithRedirect}>register</a> to continue.
            </Typography>
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Landing;
