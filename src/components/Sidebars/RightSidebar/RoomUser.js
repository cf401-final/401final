import React from 'react';
import {
  Box,
  Tooltip,
  Button,
} from '@mui/material';

const UserButton = ({ username }) => {
  const handleClick = () => {
    console.log('click')
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
