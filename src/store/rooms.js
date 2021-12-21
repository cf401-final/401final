// Actions
//const READ = 'GET_ROOM_MESSAGES';
const CREATE = 'ADD_MESSAGE_TO_ROOM';

let initialState = {
  rooms: new Map(),
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    
    case CREATE: 
      if(state.rooms.has(action.payload.room)) {
        state.rooms.set(action.payload.room, [ ...state.rooms.get(action.payload.room), action.payload.message ]);
      }
      else {
        state.rooms.set(action.payload.room, [action.payload.message]);
      }
      console.log(state.rooms)
      return state;
    default: 
      return state;
  }
}

// Action Creators
// export const getRoomMessages = room => {
//   return { 
//     type: READ,
//     payload: room
//   };
// }

export const addMessageToRoom = payload => {
  return {
    type: CREATE,
    payload
  }
}
