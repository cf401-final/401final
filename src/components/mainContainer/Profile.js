import React from 'react';
import { Typography, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f47b68',
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
          <Typography>
            <h2>Profile</h2>
            <p>Choose Your Interests:</p>
          </Typography>
          <StyledToggleButtonGroup
            id="toggleGroup"
            size="small"
            // color="primary"
            value={selected}
            aria-label="text formatting"
            onChange={handleSelected}
          >
            <ToggleButton className="interestBtn" color="primary" value="music" aria-label="music">
              Music
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="gaming" aria-label="gaming">
              Gaming
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="sports" aria-label="sports">
              Sports
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="artdesign" aria-label="artdesign">
              Art&nbsp;&&nbsp;Design
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="naturetravel" aria-label="naturetravel">
              Nature&nbsp;&&nbsp;Travel
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="fitnessrec" aria-label="fitnessrec">
              Fitness&nbsp;&&nbsp;Recreation
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="technology" aria-label="technology">
              Technology
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="finance" aria-label="finance">
              Finance
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="craftstrades" aria-label="craftstrades">
              Crafts&nbsp;&&nbsp;Trades
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="homediy" aria-label="homediy">
              Home&nbsp;&&nbsp;DIY
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="cookingfood" aria-label="cookingfood">
              Cooking&nbsp;&&nbsp;Food
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="litwriting" aria-label="litwriting">
              Literature&nbsp;&&nbsp;Writing
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="historypolitics" aria-label="historypolitics">
              History&nbsp;&&nbsp;Politics
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="dating" aria-label="dating">
              Dating
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="lgbtqia" aria-label="lgbtqia">
              LGBTQIA+
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="commpubsrvc" aria-label="commpubsrvc">
              Community&nbsp;&&nbsp;Public&nbsp;Service
            </ToggleButton>

            <ToggleButton className="interestBtn" color="primary" value="healthcare" aria-label="healthcare">
              Healthcare
            </ToggleButton>
          </StyledToggleButtonGroup>

          <p>Bio</p>
        </Paper>
      </ThemeProvider>
    </div >
  )
};

export default Profile;
