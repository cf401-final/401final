import React from 'react';
import ChatSidebar from './Chat';
import MatcherSidebar from './Matcher/MatcherSidebar';

import { Route, Routes } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar" id="resizable" elevation={10}>
      <Routes>
        <Route path="/roomchat" element={<ChatSidebar />}></Route>
        <Route path="/matcher" element={<MatcherSidebar />}></Route>
      </Routes>
      <p className="footer">© Jangle 2021</p>
    </div>
  );
};

export default LeftSidebar;
