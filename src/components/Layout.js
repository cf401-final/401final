import MainContainer from './mainContainer';
import Header from './Header';
import LeftSidebar from './Sidebars/LeftSidebar';
import RightSidebar from './Sidebars/RightSidebar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="container">
        <LeftSidebar />
        <MainContainer>{children}</MainContainer>
        {location.pathname === "/roomchat" && <RightSidebar />}
      </div>
    </>
  );
}

export default Layout;
