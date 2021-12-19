import './App.css';
import MainContainer from './components/MainContainer';
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
              {/* ROUTE BASED MAIN CONTENT HERE */}
            </Switch>
          </MainContainer>
          <Switch>  
            <Route path="/roomchat" element={<RightSidebar />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
