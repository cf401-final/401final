import './App.css';
import MainContainer from './components/mainContainer';
import Roomchat from './components/mainContainer/Roomchat';
import Matcher from './components/mainContainer/Matcher';
import Landing from './components/mainContainer/Landing';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

import {
  BrowserRouter,
  Route,
  Routes as Switch,
} from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <BrowserRouter>
          <LeftSidebar />
          <MainContainer>
            MAIN CONTAINER
            <Switch>  
              <Route exact path="/" element={<Landing />}></Route>
              <Route exact path="/roomchat" element={<Roomchat />}></Route>
              <Route exact path="/matcher" element={<Matcher />}></Route>
            </Switch>
          </MainContainer>
          <Switch>  
            <Route exact path="/roomchat" element={<RightSidebar />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
