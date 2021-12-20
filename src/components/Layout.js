import MainContainer from './mainContainer';
// import Roomchat from './mainContainer/roomchat';
// import Matcher from './mainContainer/Matcher';
// import Landing from './mainContainer/Landing';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
// import RightSidebar from './RightSidebar';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <LeftSidebar />
        <MainContainer>MAIN CONTAINER</MainContainer>
        <div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
