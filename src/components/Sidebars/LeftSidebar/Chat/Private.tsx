import { useContext } from 'react';
import {
  MenuItem,
  InputBase,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
import { SocketContext } from '../../../../context/socket';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#7db1b1',
    },
  },
});

interface PrivateRoomProps {
  handleClose(): void;
  roomname: string;
}

const Private = ({ handleClose, roomname }: PrivateRoomProps): JSX.Element => {
  const { user } = useAuth0();
  const { socket, setCurrentRoom } = useContext(SocketContext) || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await validationCheck(e.currentTarget.password.value);
    handleClose();
  };

  const displayAlert = (alertText: string): void => {
    swal({
      title: 'Oh no!',
      text: alertText,
      icon: 'warning',
      dangerMode: true,
    });      
  }

  const validationCheck = async (password: string): Promise<void> => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms/${roomname}`, {}, {
        auth: {
          username: roomname,
          password
        }
      });

      setCurrentRoom && setCurrentRoom(res.data.roomname);
    
      try {
        if(socket && user) {
          socket.emit('join', {
            room: res.data.roomname,
            user: user.nickname,
          });
          setCurrentRoom && setCurrentRoom(roomname);
        } else {
          displayAlert('Unable to connect with server.');
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      displayAlert('Unable to create a room with that name.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <form id="createRoomForm" onSubmit={handleSubmit}>
        <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          New Room Details
        </Typography>
        <Divider style={{ backgroundColor: '#99aab5' }} />
        <MenuItem>
          <InputBase
            name="password"
            placeholder="Password"
            type="password"
            sx={{ color: 'white'}}
          />
        </MenuItem>
        <div style={{display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="small"
          id="room-submit-btn"
          color="primary"
          endIcon={<CheckIcon />}
          type="submit"
        >
          Join
        </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Private;
