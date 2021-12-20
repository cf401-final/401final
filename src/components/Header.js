import React from 'react';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      <h1>
        <ForumOutlinedIcon id="bubble" />Jangle
      </h1>

      <ThemeProvider theme={theme}>
        <Typography id="onlineUsers" variant="subtitle1" gutterBottom component="div">12,345 users currently online.</Typography>
        <Button id="github" variant="contained" color="primary">
          <img className="btnImg" src={github} />
        </Button>
      </ThemeProvider>
    </div>
  )
}

export default Header;
