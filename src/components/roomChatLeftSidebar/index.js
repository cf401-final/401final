import React from 'react';
import Settings from './Settings';
import UserDetails from './UserDetails';
import MatcherButton from './MatcherButton';

const RoomChatSidebar = () => {
  return (
    <>
      <Settings />
      <UserDetails />
      <MatcherButton />
    </>
  )
}

export default RoomChatSidebar;