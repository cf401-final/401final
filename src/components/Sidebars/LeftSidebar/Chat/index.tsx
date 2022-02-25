import Rooms from './Rooms';
import { LeftSidebarComponentsProps } from '../../LeftSidebar';

const ChatSidebar = ({ joinRoom, getDirectRoomsForUser }:  LeftSidebarComponentsProps): JSX.Element => {
  return (
    <>
      <Rooms joinRoom={joinRoom} getDirectRoomsForUser={getDirectRoomsForUser} />
    </>
  );
};

export default ChatSidebar;
