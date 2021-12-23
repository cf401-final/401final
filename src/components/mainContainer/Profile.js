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
  const [selected, setSelected] = React.useState(false);

  const handleSelected = (event, newSelection) => {
    setSelected(newSelection);
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
          <Typography variant="h5">Profile</Typography>
          <Typography variant="h6">
            IMAGE GOES HERE
            <p>Choose Some Interests:</p>
          </Typography>
          <StyledToggleButtonGroup
            id="toggleGroup"
            size="small"
            // color="primary"
            value={selected}
            aria-label="text formatting"
            onChange={handleSelected}
          >
            <ToggleButton
              className="interestBtn"
              color="primary"
              value="music"
              aria-label="music"
            >
              Music
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="gaming"
              aria-label="gaming"
            >
              Gaming
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="sports"
              aria-label="sports"
            >
              Sports
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="artdesign"
              aria-label="artdesign"
            >
              Art&nbsp;&&nbsp;Design
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="naturetravel"
              aria-label="naturetravel"
            >
              Nature&nbsp;&&nbsp;Travel
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="fitnessrec"
              aria-label="fitnessrec"
            >
              Fitness&nbsp;&&nbsp;Recreation
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="technology"
              aria-label="technology"
            >
              Technology
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="finance"
              aria-label="finance"
            >
              Finance
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="craftsdiy"
              aria-label="craftsdiy"
            >
              Crafts&nbsp;&&nbsp;DIY
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="cookingfood"
              aria-label="cookingfood"
            >
              Cooking&nbsp;&&nbsp;Food
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="lgbtqia"
              aria-label="lgbtqia"
            >
              LGBTQIA+
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="dating"
              aria-label="dating"
            >
              Dating
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="litwriting"
              aria-label="litwriting"
            >
              Literature&nbsp;&&nbsp;Writing
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="historypolitics"
              aria-label="historypolitics"
            >
              History&nbsp;&&nbsp;Politics
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="commpubsrvc"
              aria-label="commpubsrvc"
            >
              Community&nbsp;&&nbsp;Public&nbsp;Service
            </ToggleButton>

            <ToggleButton
              className="interestBtn"
              color="primary"
              value="healthcare"
              aria-label="healthcare"
            >
              Healthcare
            </ToggleButton>
          </StyledToggleButtonGroup>
          <TextField
            color="primary"
            id="outlined-multiline-static"
            label="Enter a Bio:"
            multiline
            rows={5}
            placeholder="Tell other users about yourself..."
          />
          <div className="profileRow">
            <Button
              className="updateBtn"
              size="large"
              variant="contained"
              color="primary"
              endIcon={<CheckIcon />}
            >
              Update
            </Button>
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
