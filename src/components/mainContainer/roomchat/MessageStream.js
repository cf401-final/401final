import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../../context/socket';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRoomMessages } from '../../../store/rooms';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';

const MessageStream = ({ setRoomMessages, rooms, username }) => {
  const { user } = useAuth0();
  username = user.nickname;
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
        let res = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/messages/${currentRoom}`
        );
        if (res.data.length > 0)
          setRoomMessages({ messages: res.data, roomname: currentRoom });
        setMessages(rooms.get(currentRoom));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentRoom, rooms, setRoomMessages]);

  useEffect(() => {
    if (rooms.has(currentRoom)) {
      setMessages(rooms.get(currentRoom));
    }
  }, [currentRoom, rooms]);

  return (
    <>
      {messages && messages.length >= 1 && (
        <div className="message-container" data-testid="message-stream">
          {messages.map((msg, idx) => {
            return (
              <React.Fragment key={idx}>
                <div
                  className={
                    msg.username === username
                      ? 'myMessageRow'
                      : 'theirMessageRow'
                  }
                  >
                  <p
                    style={{ fontWeight: 700, marginRight: '20px', justifyContent: msg.username !== username ? 'flexStart' : 'flexEnd'}}
                  >
                    {msg.username}
                  </p>
                  <p
                    className={
                      msg.username === username
                        ? 'myChatMessage'
                        : 'theirChatMessage'
                    }
                    key={idx}
                  >
                    {`${msg.content}`}
                  </p>
                </div>
                <Typography
                  className={
                    msg.username === username
                      ? 'myChatTimeStamp'
                      : 'theirChatTimeStamp'
                  }
                  variant="caption"
                  key={idx}
                >
                  {`${msg.timeSentFormatted}`}
                </Typography>
              </React.Fragment>
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
