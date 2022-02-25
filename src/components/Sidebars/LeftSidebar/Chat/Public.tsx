import { TreeItem } from '@mui/lab';
import { RoomProps } from './types';
import { Room } from '../../../../store/actions';

function Public({ rooms, joinRoom }: RoomProps) {
  return (
    <TreeItem nodeId="0" label="PUBLIC ROOMS">
      {rooms.map((room: Room, idx: number) => {
        return (
          <TreeItem
            data-testid={`room-${room.roomname}`}
            nodeId={room.roomname}
            key={idx}
            label={room?.roomname}
            onClick={(e) => {joinRoom(e)}}
          />
        );
      })}
    </TreeItem>
  );
}
export default Public;
