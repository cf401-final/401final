import React, { useContext } from 'react'
import { MenuItem, TextField, Button, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
import { SocketContext } from '../../../../context/socket';

const CreateRoomForm = ({ handleClose }) => {
  const { user } = useAuth0();
  const { socket, setCurrentRoom } = useContext(SocketContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addRoomToServer(e.target.roomname.value, e.target.password.value);
    handleClose();
  }

  const addRoomToServer = async (roomname, password) => {
    let body = password ? { roomname, password } : { roomname };
    let res = null;
    try {
      res = await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body);
      setCurrentRoom(res.data.roomname);
      try {
        socket.emit('join', {
          room: res.data.roomname,
          user: user.nickname,
        });
        setCurrentRoom(roomname);
      } catch (err) {
        console.log(err);
      }
    } catch(err) {
      console.log(err);
      swal({
        title: "Oh no!",
        text: "Unable to create a room with that name.",
        icon: "warning",
        dangerMode: true,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="subtitle1" sx={{ marginLeft: '10px'}}>New Room Details</Typography>
      <Divider />
      <MenuItem>
        <TextField name="roomname" label="Room Name" variant="standard" required />
      </MenuItem>
      <MenuItem>
        <TextField name="password" label="Password (optional)" type="password" variant="standard" />
      </MenuItem>
      <Button
        variant="contained"
        size="small"
        id="room-submit-btn"
        color="primary"
        type="submit"
        sx={{ marginLeft: '20px' }}
      >
        Create
      </Button>
    </form>
  )
}

export default CreateRoomForm;
