import { useContext, FormEvent } from 'react';
import { Paper, InputBase } from '@mui/material';
import { SocketContext } from '../../../context/socket';
import { useAuth0 } from '@auth0/auth0-react';

interface MessageBarProps {
  scrollOnNewMessage: Function;
}

const MessageBar = ({ scrollOnNewMessage }: MessageBarProps) => {
  const { socket, currentRoom } = useContext(SocketContext) || {};
  const { user } = useAuth0();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      message: { value: string };
    };
    
    let content = target.message.value;
    let timeElapsed = Date.now();
    let date = new Date(timeElapsed);

    try {
      if(socket) {
        socket.emit('message', {
          content,
          roomname: currentRoom,
          username: (user && user.nickname) ? user.nickname : null,
          timestamp: date
        });
        scrollOnNewMessage();
      } else {
        console.log("Unable to connect to socket instance...");
      }
    } catch (err) {
      console.log(err);
    }

    target.message.value = '';
  };
  if(currentRoom) {
    return (
      <div className="message-bar" data-testid="message-bar">
        <Paper
          className="msgPaper"
          onSubmit={handleSubmit}
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#474b52',
          }}
        >
          <InputBase
            className="msgInput"
            name="message"
            sx={{ ml: 1, flex: 1, color: 'white' }}
            placeholder="Message"
            inputProps={{ 'aria-label': 'send message' }}
          />
        </Paper>
      </div>
    );
  }
  return null;
};

export default MessageBar;
