import { TreeItem } from '@mui/lab';
import { RoomProps } from './types';
import { Room } from '../../../../store/actions';

interface DirectMessageProps extends RoomProps {
  startNodeId: string;
}

function DirectMessage({ startNodeId, rooms, joinRoom }: DirectMessageProps): JSX.Element {
  return (
    <TreeItem nodeId={startNodeId} label="DIRECT MESSAGES">
      {rooms.map((room: Room, idx: number) => {
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
