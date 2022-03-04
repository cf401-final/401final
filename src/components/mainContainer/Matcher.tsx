import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import axios, { AxiosError } from 'axios';
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
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import { SocketContext } from '../../context/socket';
import friends6 from '../../img/friends6.jpeg';

const theme: Theme = createTheme({
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
  const { nickname, getAuthHeader } = useContext(AuthContext);
  const { setCurrentRoom } = useContext(SocketContext) || {};

  const [selected, setSelected] = useState<string[]>([]);
  const [bio, setBio] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [image, setImage] = useState<string | undefined>();

  type NewRoom = {
    roomname: string;
    users: [
      nickname: string,
      username: string
    ];
  }

  const handleUserChoice = async (userWasLiked: boolean) => {
    if(userWasLiked) {
      await createDirectMessageRoom();
    }
    await getRandomUser();
  }

  const createDirectMessageRoom = async () => {
    let config = await getAuthHeader();

    let roomname = `${nickname}-${username}`;
    let body: NewRoom = { roomname, users: [nickname, username] };

    try {
      await axios.post<NewRoom>(`${process.env.REACT_APP_API_SERVER}/rooms`, body, config);
      swal({
        title: "User Liked!",
        text: `This user has been added to your Direct Messages.`
      });
      if(setCurrentRoom) {
        setCurrentRoom(roomname);
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      let errorText = `The request failed to be completed`;

      if(error.response) {
        if (error.response.status === 409) {
          errorText = error.response.data.err;
        } else {
          errorText = `The request failed with status code ${error.response.status}`;
        } 
      }

      swal({
        title: "That didn't work out.",
        text: errorText,
        dangerMode: true,
      });
    }
  };

  const getRandomUser = async () => {
    let config = await getAuthHeader();
    
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/profiles/${nickname}/random`, config);

      if (res.data) {
        setSelected(res.data.interests);
        setBio(res.data.bio);
        setUsername(res.data.username);
        if(res.data.image?.url) {
          setImage(res.data.image.url);
        }
      } else {
        //Temp feedback, /random route needs to be altered to handle randomly obtaining current user
        swal({
          title: 'Oh dear...',
          text: 'We didn\'t find any users that time. Please try again!',
          dangerMode: true,
        });
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorText = (error.response?.data.error) ? error.response.data.err : 'Something went wrong while obtaining a random user...';

      swal({
        title: 'Hold up...',
        text: errorText,
        dangerMode: true,
      });
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
        <Typography variant="h6" className="letterSpacing" mb={3} mt={-4}>Match with Other Users!</Typography>
        {username ? (
          <>
            <Card id="matchCard" data-testid="matcher-card">
              {image && (
                <CardMedia
                  id="matcherImg"
                  component="img"
                  image={image}
                  alt="user image"
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div" data-testid="matcher-username">
                  {username}
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left' }}>
                  Interests:
                </Typography>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  {selected.map((interest: string) => {
                    return (
                      <Chip
                        data-testid={`matcher-interests-${interest}`}
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
                <Typography style={{ textAlign: 'left' }} data-testid="matcher-bio">{bio}</Typography>
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
          <div>
            <CardMedia
              data-testid="matcher-landing"
              id="matchLanding"
              src={friends6}
              component="img"
              image={image}
              alt="social image"
            />
            <Button
              data-testid="matcher-landing-btn"
              id="findMatchesBtn"
              variant="contained"
              color="primary"
              onClick={getRandomUser}
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
