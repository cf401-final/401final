import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rooms = () => {
  let [ publicRooms, setPublicRooms ] = useState([]);
  let [ privateRooms, setPrivateRooms ] = useState([]);

  useEffect(() => {
    (async () => {
      await getRooms();
    })();
  }, []);

  const getRooms = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`);
    setPublicRooms(res.data.filter(room => !room.password ? room : false));
    setPrivateRooms(res.data.filter(room => room.password ? room : false));
  }

  return (
    <div className="rooms-container">
      PUBLIC ROOMS
      {publicRooms.map((room, idx) => <p key={idx}>{room?.roomname}</p>)}
      PRIVATE ROOMS
      {privateRooms.map((room, idx) => <p key={idx}>{room?.roomname}</p>)} 
    </div>
  )
}

export default Rooms;
