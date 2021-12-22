import { useState } from 'react';
import { Box, Button, Tooltip, Menu, MenuItem, TextField } from '@mui/material';


const CreateRoom = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            id="room-btn"
            color="primary"
            sx={{ color: 'white' }}
          >
            + Create a room
          </Button>
        </Tooltip>
        
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <form>
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
      </Menu>
    </>
  )
}

export default CreateRoom;
