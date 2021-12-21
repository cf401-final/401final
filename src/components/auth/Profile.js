import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { isAuthenticated, user } = useAuth0();

  for (const property in user) {
    console.log(`${property}: ${user[property]}`);
  }

  return isAuthenticated && <div>{user.nickname}</div>;
}

export default Profile;
