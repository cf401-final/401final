import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import swal from 'sweetalert';
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

  const handleUserChoice = async (userWasLiked) => {
    if(userWasLiked) {
      await createDirectMessageRoom();
    }
    await getRandomUser();
  }

  const createDirectMessageRoom = async () => {
    let roomname = `${user.nickname}-${username}`;
    let body = { roomname, users: [user.nickname, username] };

    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body);
    } catch (err) {
      if (err.response.status === 409) {
        swal({
          title: 'Hold up...',
          text: err.response.data.err,
          dangerMode: true,
        });
      } else {
        swal({
          title: "That didn't work out.",
          text: `The request failed to be completed`,
          dangerMode: true,
        });
      }
    }
  };

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
              <IconButton 
                className="matchBtn" 
                size="large" 
                color="secondary"
                onClick={() => handleUserChoice(false)}
              >
                <ThumbDownAltRoundedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                className="matchBtn"
                size="large"
                color="primary"
                onClick={() => handleUserChoice(true)}
              >
                <ThumbUpAltRoundedIcon fontSize="inherit" />
              </IconButton>
              </div>
            </>
        ) : (
          <div sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80"
              component="img"
              sx={{ width: '100%', height: '70%', objectFit: "cover" }}
              image={image}
              alt="social image"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={getRandomUser}
              sx={{ marginTop: '20px' }}
            >
              Find someone to chat with!
            </Button>
          </div>
        )}
          
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default Matcher;
