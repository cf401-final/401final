import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Rooms = () => {
  let [ publicRooms, setPublicRooms ] = useState([]);
  let [ privateRooms, setPrivateRooms ] = useState([]);

  useEffect(() => {
    (async () => {
      await getRooms();
    })();
  }, []);

  const getRooms = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`);
    setPublicRooms(res.data.filter(room => !room.password ? room : false));
    setPrivateRooms(res.data.filter(room => room.password ? room : false));
  }

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
            return <TreeItem nodeId={idx + 1} key={idx} label={room?.roomname}/>;
          })}
        </TreeItem>
        <TreeItem nodeId={`${publicRooms.length + 1}`} label="PRIVATE ROOMS">
          {privateRooms.map((room, idx) => {
            return <TreeItem nodeId={`${idx + publicRooms.length + 2}`} key={idx} label={room?.roomname}/>;
          })}
        </TreeItem>
      </TreeView>
    </div>
  )
}

export default Rooms;
