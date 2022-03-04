import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContext } from '../../../context/auth';
import { SocketContext } from '../../../context/socket';
import { Room } from '../../../store/actions';
import Nav from './Nav';
import ChatSidebar from './Chat';
import MatcherSidebar from './Matcher/MatcherSidebar';

export interface LeftSidebarComponentsProps {
  joinRoom(e: React.MouseEvent<HTMLLIElement>): void;
  getDirectRoomsForUser(rooms: Room[]): Room[];
}

const LeftSidebar = (): JSX.Element => {
  const { isAuthenticated } = useAuth0();
  
  const { nickname: username } = useContext(AuthContext);
  const { socket, setCurrentRoom } = useContext(SocketContext) || {};

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

  const getDirectRoomsForUser = (rooms: Room[]): Room[] => {{
    return rooms.filter((room: Room) => {
      if(room.users && room.users?.length > 0 && room.roomname.split('-').includes(username)) {
        return room;
      } else return false;
    });
  }}

  return (
    isAuthenticated ? (
      <div className="left-sidebar" id="resizable" data-testid="left-sidebar">
        <Routes>
          <Route path="/roomchat" element={<ChatSidebar joinRoom={joinRoom} getDirectRoomsForUser={getDirectRoomsForUser} />} />
          <Route path="/matcher" element={<MatcherSidebar joinRoom={joinRoom} getDirectRoomsForUser={getDirectRoomsForUser} />} />
        </Routes>
        <div className="footer" data-testid="footer">
          <Nav />
          <Typography variant="overline" gutterBottom style={{ textAlign: 'center', marginTop: '1.4rem' }}>© Jangle 2021</Typography>
        </div>
      </div>
    ) : (
      <div className="left-sidebar" id="resizable">
        <Typography variant="overline" gutterBottom className="footer" style={{ textAlign: 'center', marginTop: '1.4rem' }}>© Jangle 2021</Typography>
      </div>
    )
  );
};

export default LeftSidebar;
