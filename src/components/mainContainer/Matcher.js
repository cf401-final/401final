import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7db1b1',
    },
    secondary: {
      main: '#EE8585',
    },
  },
});

const Matcher = () => {
  const { user } = useAuth0();
  const [selected, setSelected] = useState([]);
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const getRandomUser = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}/random`
      );
      if (res.data) {
        setSelected(res.data.interests);
        setBio(res.data.bio);
        setUsername(res.data.username);
        res.data.image?.url ? setImage(res.data.image.url) : setImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="matcher">
      <Paper
        id="matcherPaper"
        elevation={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <ThemeProvider theme={theme}>
        {username ? (
          <>
            <Card id="matchCard">
              {image && (
                <CardMedia
                  id="matcherImg"
                  component="img"
                  image={image}
                  alt="user image"
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {username}
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left' }}>
                  Interests:
                </Typography>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  {selected.map((interest) => {
                    return (
                      <Chip
                        className="matchChip"
                        variant="outlined"
                        label={interest}
                        color="default"
                        key={interest}
                      />
                    );
                  })}
                </div>
                <Typography variant="h6" style={{ textAlign: 'left' }}>
                  Bio:
                </Typography>
                <Typography style={{ textAlign: 'left' }}>{bio}</Typography>
              </CardContent>
              </Card>
              <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
              }}
              >
              <IconButton className="matchBtn" size="large" color="secondary">
                <ThumbDownAltRoundedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                className="matchBtn"
                size="large"
                color="primary"
                onClick={getRandomUser}
              >
                <ThumbUpAltRoundedIcon fontSize="inherit" />
              </IconButton>
              </div>
            </>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={getRandomUser}
            mb={10}
          >
            Find someone to chat with!
          </Button>
        )}
          
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default Matcher;
