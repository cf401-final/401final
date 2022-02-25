import { Room } from '../../../../store/actions';

export interface RoomProps {
  rooms: Room[];
  joinRoom(e: React.MouseEvent<HTMLLIElement>): void;
}
