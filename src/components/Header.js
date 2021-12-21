import React from 'react';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import github from '../img/github.png';
import LoginButton from './auth/Login';
import LogoutButton from './auth/Logout';
import Profile from './auth/Profile';
import LoadingWrapper from './auth/LoadingWrapper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#36393f',
    },
  },
});

const Header = () => {
  return (
    <div className="header">
      <ThemeProvider theme={theme}>
        <Button id="profileBtn" variant="contained" color="primary">
          <AccountCircleIcon sx={{ fontSize: 25 }} />
        </Button>

        <LoadingWrapper>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </LoadingWrapper>

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
