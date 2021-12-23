import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Paper, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const Matcher = () => {
  const { user } = useAuth0();
  const [selected, setSelected] = React.useState([]);
  const [bio, setBio] = React.useState('');
  const [username, setUsername] = React.useState('');

  const getRandomUser = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}/random`);
      if(res.data) {
        setSelected(res.data.interests);
        setBio(res.data.bio);
        setUsername(res.data.username);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div id="profile">
      <Paper
        id="profilePaper"
        elevation={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {selected.map(interest => {
          return <Typography key={interest}>{interest}</Typography>
        })}
        <Typography>{bio}</Typography>
        <Typography>{username}</Typography>
          
        <Button
          className="updateBtn"
          size="large"
          variant="contained"
          color="success"
          endIcon={<CheckIcon />}
          onClick={getRandomUser}
        >
          Get Random User
        </Button>
      </Paper>
    </div>
  );
};

export default Matcher;
