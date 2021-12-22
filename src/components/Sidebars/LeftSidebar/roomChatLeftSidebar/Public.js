import React from 'react';
import { TreeItem } from '@mui/lab';

function Public({ publicRooms, joinRoom }) {
  return (
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
  );
}
export default Public;
