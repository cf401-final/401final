import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../../../context/socket';

const UserList = () => {
  const { socket, currentRoom } = useContext(SocketContext);
  const [ loggedInUsers, setLoggedInUsers ] = useState(null);

  useEffect(() => {
    socket.emit('get-users-for-room', {room: currentRoom});
    socket.on('get-users-for-room', ({ users }) => {
      setLoggedInUsers([...users]);
    });
  }, [socket, currentRoom]);

  useEffect(() =>{
    console.log(loggedInUsers, '<<<<')
  }, [loggedInUsers])

  return (
    <div>
      USERLIST
      {loggedInUsers && loggedInUsers.map(([username], idx) => {
        return <p key={idx}>{username}</p>
      })}
    </div>
  )
}

export default UserList;
