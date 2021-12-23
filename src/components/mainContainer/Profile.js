import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Typography, ToggleButtonGroup, ToggleButton, TextField, Button } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

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
  const interests = [
    {label: 'Music', value: 'music'}, {label: 'Crafts & DIY', value: 'craftsdiy'},
    {label: 'Gaming', value: 'gaming'}, {label: 'Cooking & Food', value: 'cookingfood'},
    {label: 'Sports', value: 'sports'}, {label: 'LGBTQIA+', value: 'lgbtqia'},
    {label: 'Art & Design', value: 'artdesign'}, {label: 'Literature & Writing', value: 'litwriting'},
    {label: 'Nature & Travel', value: 'naturetravel'}, {label: 'History & Politics', value: 'historypolitics'},
    {label: 'Fitness & Recreation', value: 'fitnessrec'}, {label: 'Community & Public Service', value: 'commpubsrvc'},
    {label: 'Technology', value: 'technology'}, {label: 'Healthcare', value: 'healthcare'},
    {label: 'Finnance', value: 'finnance'},
  ]

  const handleSelected = (event, newSelection) => {
    setSelected(newSelection);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { interests: selected, bio: e.target.bio.value, user: user.nickname };
    console.log(body)
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
            // backgroundColor: '#474b52'
          }}
        >
          <Typography>
            <h2>Profile</h2>
            <h3>IMAGE GOES HERE</h3>
            <p>Choose Some Interests:</p>
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledToggleButtonGroup
              id="toggleGroup"
              size="small"
              // color="primary"
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
              required
              id="outlined-multiline-static"
              name="bio"
              label="Enter a Bio:"
              multiline
              rows={5}
              sx={{ width: '100%'}}
              placeholder="Tell other users about yourself..."
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
    </div >
  )
};

export default Profile;
