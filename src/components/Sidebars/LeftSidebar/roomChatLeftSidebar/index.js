import React from 'react';
import Settings from './Settings';
import UserDetails from './UserDetails';
import MatcherButton from './MatcherButton';
import Rooms from './rooms';

const RoomChatSidebar = () => {
  return (
    <>
      <Settings />
      <UserDetails />
      <MatcherButton />
      <Rooms />
    </>
  );
};

export default RoomChatSidebar;
