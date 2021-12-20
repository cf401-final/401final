import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rooms = () => {
  let [ rooms, setRooms ] = useState([]);
  
  useEffect(() => {
    (async () => {
      await getRooms();
    })();
  }, []);

  const getRooms = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`);
    setRooms(res.data);
  }

  return (
    <div className="rooms-container">
      {rooms.map((room, idx) => {
        return <p key={idx}>{`${room.roomname}`}</p>
      })}
    </div>
  )
}

export default Rooms;
