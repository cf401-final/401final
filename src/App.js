import './App.scss';
import Profile from './components/mainContainer/Profile';
import Roomchat from './components/mainContainer/roomchat';
import Matcher from './components/mainContainer/Matcher';
import Landing from './components/mainContainer/Landing';
import Layout from './components/Layout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route
              path="profile"
              element={
                <RequireAuth redirectTo="/">
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="roomchat"
              element={
                <RequireAuth redirectTo="/">
                  <Roomchat />
                </RequireAuth>
              }
            />
            <Route
              path="matcher"
              element={
                <RequireAuth redirectTo="/">
                  <Matcher />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
