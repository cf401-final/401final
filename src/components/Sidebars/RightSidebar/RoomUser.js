import React, { useContext } from 'react';
import { Box, Tooltip, Button } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';
import { SocketContext } from '../../../context/socket';

const UserButton = ({ username }) => {
  const { user } = useAuth0();
  const { socket, setCurrentRoom } = useContext(SocketContext);


  const createDirectMessageRoom = async () => {
    let roomname = `${user.nickname}-${username}`;
    let body = { roomname, users: [user.nickname, username]};

    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body);
      setCurrentRoom(roomname);
      try {
        socket.emit('join', {
          room: roomname,
          user: user.nickname,
        });
        setCurrentRoom(roomname);
      } catch (err) {
        console.log(err);
      }
    } catch(err) {
      if(err.response.status === 409) {
        swal({
          title: "Hold up...",
          text:  err.response.data.err,
        });
      } else {
        swal({
          title: "That didn't work out.",
          text: `The request failed to be completed`,
        });
      }
    }
  }

  const handleClick = async () => {
    if(username === user.nickname) {
      swal({
        title: "Hold up...",
        text: "You are trying to start a 1-1 conversation with yourself. Try someone else!",
      });
      return;
    }
    await createDirectMessageRoom();
  }
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={`Chat with ${username}?`}>
          <Button
            onClick={handleClick}
            size="small"
            id="user-btn"
            color="primary"
            sx={{ color: 'white' }}
          >
            {username}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
}
export default UserButton;
