import React from 'react';
import { TreeItem } from '@mui/lab';

function Private({ privateRooms, publicRooms, joinRoom }) {
  return (
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
  );
}
export default Private;
