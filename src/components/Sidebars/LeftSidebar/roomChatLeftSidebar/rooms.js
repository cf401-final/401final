import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth0 } from '@auth0/auth0-react';
import { SocketContext } from '../../../../context/socket';

const Rooms = () => {
  const { socket, setCurrentRoom } = useContext(SocketContext);
  const { isAuthenticated, user } = useAuth0();

  let username = isAuthenticated
    ? user.nickname
    : `Test-User#${Math.round(Math.random() * 1000)}`;

  let [publicRooms, setPublicRooms] = useState([]);
  let [privateRooms, setPrivateRooms] = useState([]);

  useEffect(() => {
    (async () => {
      await getRooms();
    })();
  }, []);

  const joinRoom = (e) => {
    let room = e.target.innerText;
    
    try {
      socket.emit('join', {
        room,
        username,
      });
      setCurrentRoom(room);
    } catch (err) {
      console.log(err);
    }
  };

  const getRooms = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`);
    setPublicRooms(res.data.filter((room) => (!room.password ? room : false)));
    setPrivateRooms(res.data.filter((room) => (room.password ? room : false)));
  };

  return (
    <div className="rooms-container">
      <TreeView
        mt={3}
        aria-label="room navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
      >
        <TreeItem nodeId="0" label="PUBLIC ROOMS">
          {publicRooms.map((room, idx) => {
            return (
              <TreeItem
                nodeId={`${idx + 1}`}
                key={idx}
                label={room?.roomname}
                onClick={joinRoom}
              />
            );
          })}
        </TreeItem>
        <TreeItem nodeId={`${publicRooms.length + 1}`} label="PRIVATE ROOMS">
          {privateRooms.map((room, idx) => {
            return (
              <TreeItem
                nodeId={`${idx + publicRooms.length + 2}`}
                key={idx}
                label={room?.roomname}
                onClick={joinRoom}
              />
            );
          })}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Rooms;
