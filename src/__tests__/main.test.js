import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';
import SocketProvider from '../context/socket';

import { useAuth0 } from "@auth0/auth0-react";

const user = {
  email: "foo@test.com",
  nickname: "testy mctesterson",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
  isAuthenticated: true,
};

jest.mock("@auth0/auth0-react");

beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
  });

  render (
    <Provider store={store()}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  );
});


describe('Testing core behaviors of app', () => {
  it('Should properly render the application\'s initial components', async () => {
    let header = screen.getByTestId('header');
    let mainContainer = screen.getByTestId('main-container');
    let leftSidebar = screen.getByTestId('left-sidebar');
    let footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(mainContainer).toBeInTheDocument();
    expect(leftSidebar).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('It should render the proper roomchat components', () => {
    let roomchatBtn = screen.getByTestId('roomchat-btn');
    fireEvent.click(roomchatBtn);

    let roomchat = screen.getByTestId('roomchat-container');
    let createRoomBtn = screen.getByTestId('create-room-btn');
    let userlist = screen.getByTestId('userlist');
    expect(roomchat).toBeInTheDocument();
    expect(createRoomBtn).toBeInTheDocument();
    expect(userlist).toBeInTheDocument();
  });
});
