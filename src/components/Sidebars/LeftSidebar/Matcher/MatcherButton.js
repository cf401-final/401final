import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MatcherButton = () => {
  return (
    <div id="leftSidebar">
      <Button size="small" component={Link} to={`/matcher`} variant="contained">
        Find people to chat with
      </Button>
    </div>
  );
};

export default MatcherButton;
