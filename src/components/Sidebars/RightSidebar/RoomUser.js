import React from 'react';
import { Box, Tooltip, Button } from '@mui/material';
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';

const UserButton = ({ username }) => {
  const { user } = useAuth0();

  const handleClick = async () => {
    if(username === user.nickname) {
      swal({
        title: "Hold up...",
        text: "You are trying to start a 1-1 conversation with yourself. Try someone else!",
      });
      return;
    }
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
