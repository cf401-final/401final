import './App.css';
import MainContainer from './components/MainContainer';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Container from '@mui/material/Container';

import {
  BrowserRouter,
  Route,
  Routes as Switch,
} from 'react-router-dom';

const App = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column"}}>
      <Header />
      <Container sx={{ display: "flex", flexWrap: "row" }}>
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
      </Container>
    </Container>
  );
}

export default App;
