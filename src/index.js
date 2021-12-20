import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { SocketContext, socket } from './context/socket';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
