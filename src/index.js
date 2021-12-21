import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import SocketProvider from './context/socket';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <SocketProvider>
      <App />
    </SocketProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
