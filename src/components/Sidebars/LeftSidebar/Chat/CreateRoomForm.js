import React from 'react'
import { MenuItem, TextField, Button } from '@mui/material';

const CreateRoomForm = ({ handleClose }) => {
  const handleSubmit = () => {
    console.log('add room submit');
    handleClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <MenuItem>
        <TextField id="standard-basic" label="Room Name" variant="standard" />
      </MenuItem>
      <MenuItem>
        <TextField id="standard-basic" label="Password (optional)" type="password" variant="standard" />
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
