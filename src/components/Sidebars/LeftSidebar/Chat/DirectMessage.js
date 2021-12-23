import React from 'react';
import { TreeItem } from '@mui/lab';

function DirectMessage({ directMsgRooms, joinRoom }) {
  return (
    <TreeItem nodeId="2" label="1-1 ROOMS">
      {directMsgRooms.map((room, idx) => {
        return (
          <TreeItem
            nodeId={room.roomname}
            key={idx}
            label={room?.roomname}
            onClick={joinRoom}
          />
        );
      })}
    </TreeItem>
  );
}

export default DirectMessage;
