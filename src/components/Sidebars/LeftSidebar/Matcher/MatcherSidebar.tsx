import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useStateIfMounted } from 'use-state-if-mounted';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setRooms, SetRoomsAction, Room } from '../../../../store/actions';
import { AuthContext } from '../../../../context/auth';
import { SocketContext } from '../../../../context/socket';
import { TreeView } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LeftSidebarComponentsProps } from '../../LeftSidebar';
import DirectMessage from '../Chat/DirectMessage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface MatcherSidebarProps extends LeftSidebarComponentsProps {
  setRooms(rooms: Room[]): SetRoomsAction;
}

const MatcherSidebar = ({ setRooms, joinRoom, getDirectRoomsForUser }: MatcherSidebarProps) => {
  const location = useLocation();
  let navigate = useNavigate();

  const { nickname: username, getAuthHeader } = useContext(AuthContext);
  const { currentRoom } = useContext(SocketContext) || {};
  const [directMsgRooms, setDirectMsgRooms] = useStateIfMounted<Room[]>([]);

  useEffect(() => {
    (async () => {
      let res = null;
      let config = await getAuthHeader();

      try {
        res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`, config);
        setRooms && setRooms(res.data);
        setDirectMsgRooms(getDirectRoomsForUser(res.data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setRooms, currentRoom, username]);

  const joinDirectMessageRoom = (e: React.MouseEvent<HTMLLIElement>) => {
    joinRoom(e);

    if (location.pathname !== '/roomchat') navigate('/roomchat');
  };

  return (
    <div className="rooms-container" data-testid="matcher-rooms">
      <TreeView
        defaultExpanded={['0']}
        aria-label="room navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
      >
        {directMsgRooms?.length > 0 && (
          <DirectMessage
            startNodeId="0"
            joinRoom={joinDirectMessageRoom}
            rooms={directMsgRooms}
          />
        )}
      </TreeView>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setRooms: (rooms: Room[]) => dispatch(setRooms(rooms)),
});

export default connect(null, mapDispatchToProps)(MatcherSidebar);
