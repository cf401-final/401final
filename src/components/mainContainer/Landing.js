import React from 'react';
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7db1b1',
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
            <Link to="/roomchat">
              <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<ChatOutlinedIcon />}
                sx={{ m: 1, mt: -1 }}>Start Chatting
              </Button>
            </Link>
            <Link to="/matcher">
              <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<SentimentVerySatisfiedIcon />}
                sx={{ m: 1, mt: -1 }}>Find Matches
              </Button>
            </Link>
          </>
        ) : (
          <Typography>
            Please <a onClick={loginWithRedirect}>sign in</a> or{' '}
            <a onClick={loginWithRedirect}>register</a> to continue.
          </Typography>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Landing;
