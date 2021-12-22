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
        <Layout>
          <Routes>
            <Route exact path="/" element={<Landing />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/roomchat" element={<Roomchat />}></Route>
            <Route exact path="/matcher" element={<Matcher />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
