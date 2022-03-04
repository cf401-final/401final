import { useContext, useEffect, useState } from 'react';
import { Box, Tooltip, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import axios, { AxiosError } from 'axios';
import swal from 'sweetalert';
import { AuthContext } from '../../../context/auth';
import { SocketContext } from '../../../context/socket';

interface UserButtonProps {
  username: string;
}

const UserButton = ({ username }: UserButtonProps) => {
  const [userProfile, setUserProfile] = useState<{ image: { url: string } }>();
  
  const { nickname, getAuthHeader } = useContext(AuthContext)
  const { socket, setCurrentRoom } = useContext(SocketContext) || {};

  const theme: Theme = createTheme({
    palette: {
      primary: {
        main: '#303136',
      },
    },
  });

  useEffect(() => {
    (async () => {
      let config = await getAuthHeader();

      try {
        let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/profiles/${username}`, config);
        setUserProfile(res.data[0]);
      } catch(err) {
        console.log(err)
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const createDirectMessageRoom = async () => {
    let roomname = `${nickname}-${username}`;
    let body = { roomname, users: [nickname, username] };

    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body);
      setCurrentRoom && setCurrentRoom(roomname);
      try {
        if(socket) {
          socket.emit('join', {
            room: roomname,
            user: nickname,
          });
          setCurrentRoom && setCurrentRoom(roomname);
        }
       
      } catch (err: unknown) {
        const error = err as AxiosError;
        console.log('SOCKET ERROR:', error);
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      let errorText = `The request failed to be completed`;

      if(error.response) {
        if (error.response.status === 409) {
          errorText = error.response.data.err;
        } else {
          errorText = `The request failed with status code ${error.response.status}`;
        } 
      }

      swal({
        title: "That didn't work out.",
        text: errorText,
        dangerMode: true,
      });
    }
  };

  const handleClick = async () => {
    if (username === nickname) {
      swal({
        title: 'Hold up...',
        text: 'You are trying to send a Direct Message to yourself. Try someone else!',
        dangerMode: true,
      });
      return;
    }
    await createDirectMessageRoom();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Tooltip title={`Chat with ${username}?`}>
            <Button
              className="rightUserBtn"
              variant="contained"
              color="primary"
              onClick={handleClick}
              size="large"
              id="user-btn"
            >
              <Avatar
                className="rightAvatar"
                alt={nickname}
                src={userProfile?.image?.url ? `${userProfile.image.url}` : undefined}
              />
              {username}
            </Button>
          </Tooltip>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default UserButton;
