// Actions
// const READ_ROOM_MESSAGES = 'READ_ROOM_MESSAGES';
const ADD_MESSAGE_TO_ROOM = 'ADD_MESSAGE_TO_ROOM';
const SET_ROOMS = 'READ_ROOMS'

let initialState = {
  rooms: new Map(),
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    
    case ADD_MESSAGE_TO_ROOM: 
      if(state.rooms.has(action.payload.room)) {
        state.rooms.set(action.payload.room, [ ...state.rooms.get(action.payload.room), action.payload.message ]);
      }
      else {
        state.rooms.set(action.payload.room, [action.payload.message]);
      }
      return state;
    case SET_ROOMS:
      action.rooms.forEach(room => {
        if(!state.rooms.has(room)) {
          state.rooms.set(room.roomname, []);
        }
      });
      return state;
    default: 
      return state;
  }
}

// Action Creators
export const setRooms = rooms => {
  return { 
    type: SET_ROOMS,
    rooms
  };
}

export const addMessageToRoom = payload => {
  return {
    type: ADD_MESSAGE_TO_ROOM,
    payload
  }
}
