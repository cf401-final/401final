import React from 'react';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import github from '../img/github.png';
// import Paper from '@mui/material/Paper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#303136',
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

        <h1>
          <ForumOutlinedIcon id="bubble" />Jangle
        </h1>

        <Typography id="onlineUsers" variant="subtitle1" gutterBottom component="div">12,345 users currently online.</Typography>
        <a href="https://github.com/jangle401/jangle-front" target="_blank" rel="noreferrer">
          <Button id="githubBtn" variant="contained" color="primary">
          <img className="btnImg" src={github} />
        </Button>
        </a>
      </ThemeProvider>
    </div>
  )
}

export default Header;
