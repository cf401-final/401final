import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRoomMessages } from '../../../store/rooms';

const MessageStream = ({ setRoomMessages, rooms }) => {
  const { socket, currentRoom } = useContext(SocketContext);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    function listener() {
      setMessages(rooms.get(currentRoom));
    }
    socket.on('message', listener);

    return function cleanup() {
      socket.off('message', listener);
    };
  }, [socket, rooms, messages, currentRoom]);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${process.env.REACT_APP_API_SERVER}/messages/${currentRoom}`);
        if(res.data.length > 0)
          setRoomMessages({ messages: res.data, roomname: currentRoom });
          setMessages(rooms.get(currentRoom));
      } catch(err) {
        console.log(err);
      }
    })()

  }, [currentRoom, rooms, setRoomMessages])

  useEffect(() => {
    if (rooms.has(currentRoom)) {
      setMessages(rooms.get(currentRoom));
    }
  }, [currentRoom, rooms]);

  return (
    <>
      {messages.length >= 1 && (
        <div className="message-container">
          {/* <p className="theirChatMessage">TEXT</p> */}
          {messages.map((msg, idx) => {
            return (
              <>
                <p key={idx}>
                  {`${msg.timeSentFormatted}`}
                </p>
                <p className="myChatMessage" key={idx}>
                  {`${msg.content}`}
                </p>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setRoomMessages: (data) => dispatch(setRoomMessages(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MessageStream);
