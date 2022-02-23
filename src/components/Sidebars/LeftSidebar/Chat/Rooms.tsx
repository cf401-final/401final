import React, { useEffect, useContext } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TreeView } from '@mui/lab';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth0 } from '@auth0/auth0-react';
import { setRooms, SetRoomsAction, Room } from '../../../../store/actions';
import { SocketContext } from '../../../../context/socket';
import Public from './Public';
import DirectMessage from './DirectMessage';
import CreateRoom from './CreateRoom';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

interface RoomsProps {
  setRooms(rooms: Room[]): SetRoomsAction;
}

const Rooms = ({setRooms}: RoomsProps): JSX.Element => {
  const { socket, setCurrentRoom, currentRoom } = useContext(SocketContext) || {};
  const { isAuthenticated, user } = useAuth0();

  let username = isAuthenticated
    ? (user && user.nickname) ? user.nickname : 'user'
    : `Test-User#${Math.round(Math.random() * 1000)}`;

  const [publicRooms, setPublicRooms] = useStateIfMounted<Room[]>([]);
  const [directMsgRooms, setDirectMsgRooms] = useStateIfMounted<Room[]>([]);

  useEffect(() => {
    (async () => {
      let res = null;
      try {
        res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`);

        setRooms(res.data);
        setPublicRooms(
          res.data.filter((room: Room) =>
            !room.password && room.users?.length === 0 ? room : false
          )
        );
        setDirectMsgRooms(
          res.data.filter((room: Room) => {
            if(room.users && room.users?.length > 0 && room.roomname.split('-').includes(username)) {
              return room;
            } else return false;
          })
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setRooms, currentRoom, username]);

  const joinRoom = (e: React.MouseEvent<HTMLLIElement>) => {
    let room = e.currentTarget.innerText;
    if(socket) {
      try {
        socket.emit('join', {
          room,
          username,
        });
        setCurrentRoom && setCurrentRoom(room);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="rooms-container">
      <ThemeProvider theme={theme}>
        <CreateRoom />
        <TreeView
          color="primary"
          defaultExpanded={['0', '1', '2']}
          aria-label="room navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
        >
          <Public joinRoom={joinRoom} rooms={publicRooms} />
          {directMsgRooms.length > 0 && (
            <DirectMessage
              startNodeId="1"
              joinRoom={joinRoom}
              rooms={directMsgRooms}
            />
          )}
        </TreeView>
      </ThemeProvider>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setRooms: (rooms: Room[]) => dispatch(setRooms(rooms)),
});

export default connect(null, mapDispatchToProps)(Rooms);
