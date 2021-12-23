import React from 'react';
import {
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
} from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7289da',
    },
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const Profile = () => {
  const { user } = useAuth0();
  const [selected, setSelected] = React.useState(false);
  const [bio, setBio] = React.useState('');

  const interests = [
    {label: 'Music', value: 'music'}, {label: 'Crafts & DIY', value: 'craftsdiy'},
    {label: 'Gaming', value: 'gaming'}, {label: 'Cooking & Food', value: 'cookingfood'},
    {label: 'Sports', value: 'sports'}, {label: 'LGBTQIA+', value: 'lgbtqia'},
    {label: 'Art & Design', value: 'artdesign'}, {label: 'Literature & Writing', value: 'litwriting'},
    {label: 'Nature & Travel', value: 'naturetravel'}, {label: 'History & Politics', value: 'historypolitics'},
    {label: 'Fitness & Recreation', value: 'fitnessrec'}, {label: 'Community & Public Service', value: 'commpubsrvc'},
    {label: 'Technology', value: 'technology'}, {label: 'Healthcare', value: 'healthcare'},
    {label: 'Finance', value: 'finance'},
  ];

  useEffect(() => {
    (async () => {
      try {
        //auto-populates form fields with existing profile data, if they have a profile
        let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}`);
        console.log(res.data[0])
        setSelected(res.data[0].interests);
        setBio(res.data[0].bio);
      } catch(err) {
        console.log(err);
      }
    })();
  }, [user.nickname]);

  const handleSelected = (event, newSelection) => {
    setSelected(newSelection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { interests: selected, bio: e.target.bio.value, username: user.nickname };

    let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}`);
    if(res.data.length > 0) {
      //if there is a user profile already, update it
      axios.put(`${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}`, body);
    } else {
      // else create a new one
      axios.post(`${process.env.REACT_APP_API_SERVER}/profiles`, body);
    }    
    swal({
      title: "Success!",
      text:  "Your profile has been updated. Enjoy socializing!",
      icon: "success"
    });
  };

  return (
    <div id="profile">
      <ThemeProvider theme={theme}>
        <Paper
          id="profilePaper"
          elevation={0}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h5">Profile</Typography>
          <Typography variant="h6">
            IMAGE GOES HERE
            <p>Choose Some Interests:</p>
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledToggleButtonGroup
              id="toggleGroup"
              size="small"
              value={selected}
              aria-label="text formatting"
              onChange={handleSelected}
            >
              {interests.map(interest => {
                return (
                  <ToggleButton key={interest.value} className="interestBtn" color="primary" value={interest.value} aria-label={interest.value}>
                    {interest.label}
                  </ToggleButton>
                )
              })}
            </StyledToggleButtonGroup>
            <TextField
              color="primary"
              id="outlined-multiline-static"
              name="bio"
              label="Enter a Bio:"
              defaultValue={bio}
              rows={5}
              sx={{ width: '100%'}}
              placeholder="Tell other users about yourself..."
              multiline
              autoFocus
              required
            />
            <div className="profileRow">
              <Button
                className="updateBtn"
                size="large"
                variant="contained"
                color="primary"
                endIcon={<CheckIcon />}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
