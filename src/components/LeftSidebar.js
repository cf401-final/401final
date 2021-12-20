import React from 'react';
import RoomChatLeftSidebar from './roomChatLeftSidebar';
import MatcherLeftSidebar from './roomChatLeftSidebar/MatcherSidebar';
import AuthButtons from './AuthButtons';

import { Route, Routes } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar" id="resizable" elevation={10}>
      <Routes>
        <Route path="/" element={<AuthButtons />}></Route>
        <Route path="/roomchat" element={<RoomChatLeftSidebar />}></Route>
        <Route path="/matcher" element={<MatcherLeftSidebar />}></Route>
      </Routes>
    </div>
    
  )
}

export default LeftSidebar;

