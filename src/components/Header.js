import React from 'react';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useAuth0 } from '@auth0/auth0-react';

import github from '../img/github.png';
import UserButton from './auth/UserButton';
import SignupButton from './auth/SignupButton';

const theme = createTheme({
  palette: {
    primary: {
      main: '#36393f',
    },
  },
});

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header">
      <ThemeProvider theme={theme}>
        {isAuthenticated ? <UserButton /> : <SignupButton />}

        <h1>
          <ForumOutlinedIcon id="bubble" />
          Jangle
        </h1>

        <Typography
          id="onlineUsers"
          variant="subtitle2"
          gutterBottom
          component="div"
        >
          12,345 users currently online.
        </Typography>
        <a
          href="https://github.com/jangle401/jangle-front"
          target="_blank"
          rel="noreferrer"
        >
          <Button id="githubBtn" variant="contained" color="primary">
            <img className="btnImg" src={github} />
          </Button>
        </a>
      </ThemeProvider>
    </div>
  );
};

export default Header;
