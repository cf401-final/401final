import React from 'react';
import RoomChatLeftSidebar from './roomChatLeftSidebar';
import MatcherLeftSidebar from './roomChatLeftSidebar/MatcherSidebar';
import AuthButtons from './AuthButtons';

import {
  Route,
  Routes as Switch,
} from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar" id="resizable" elevation={10}>
      <Switch>  
        <Route path="/" element={<AuthButtons />}></Route>
        <Route path="/roomchat" element={<RoomChatLeftSidebar />}></Route>
        <Route path="/matcher" element={<MatcherLeftSidebar />}></Route>
      </Switch>
    </div>
    
  )
}

export default LeftSidebar;

