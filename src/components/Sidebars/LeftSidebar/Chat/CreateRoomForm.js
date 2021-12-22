import React from 'react'
import { MenuItem, TextField, Button, Typography, Divider } from '@mui/material';

const CreateRoomForm = ({ handleClose }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.roomname.value);
    console.log(e.target.password.value);
    handleClose();
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
