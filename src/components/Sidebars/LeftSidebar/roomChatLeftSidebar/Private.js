import React from 'react';
import { TreeItem } from '@mui/lab';

function Private({ privateRooms, joinRoom }) {
  return (
    <TreeItem nodeId="1" label="PRIVATE ROOMS">
      {privateRooms.map((room, idx) => {
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
export default Private;
