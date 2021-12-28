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

  it('Should render the proper roomchat components', () => {
    let roomchatBtn = screen.getByTestId('roomchat-btn');
    fireEvent.click(roomchatBtn);

    let roomchat = screen.getByTestId('roomchat-container');
    let createRoomBtn = screen.getByTestId('create-room-btn');
    let userlist = screen.getByTestId('userlist');
    expect(roomchat).toBeInTheDocument();
    expect(createRoomBtn).toBeInTheDocument();
    expect(userlist).toBeInTheDocument();
  });

  it('Should render the proper matcher components', () => {
    let matcherBtn = screen.getByTestId('matcher-left-btn');
    fireEvent.click(matcherBtn);

    let matcherLanding = screen.getByTestId('matcher-landing');
    let matcherLandingBtn = screen.getByTestId('matcher-landing-btn');
    let matcherRooms = screen.getByTestId('matcher-rooms');

    expect(matcherLanding).toBeInTheDocument();
    expect(matcherLandingBtn).toBeInTheDocument();
    expect(matcherRooms).toBeInTheDocument();
  });

  it('Should render the proper profile components', () => {
    let profileBtn = screen.getByTestId('profile-left-btn');
    fireEvent.click(profileBtn);

    let profileContainer = screen.getByTestId('profile-container');
    let uploadProfileimageBtn = screen.getByTestId('upload-profileimage-btn');
    let toggleBtn = screen.getByTestId('toggle-btn-music'); //just seeing if one of many interests renders
    let profileBioField = screen.getByTestId('profile-bio-field');
    let profileSubmitBtn = screen.getByTestId('profile-submit-btn');

    expect(profileContainer).toBeInTheDocument();
    expect(uploadProfileimageBtn).toBeInTheDocument();
    expect(toggleBtn).toBeInTheDocument();
    expect(profileBioField).toBeInTheDocument();
    expect(profileSubmitBtn).toBeInTheDocument();
  });
});
