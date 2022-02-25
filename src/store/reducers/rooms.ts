import { ActionTypes, Action } from '../actions';

let initialState = {
  rooms: new Map().set('general', []),
};

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.setRooms:
      if (Array.isArray(action.payload)) {
        action.payload.forEach((room) => {
          if (!state.rooms.has(room)) {
            state.rooms.set(room, []);
          }
        });
      }
      return state;

    case ActionTypes.setRoomMessages:
      if (action.payload.messages) {
        state.rooms.set(action.payload.roomname, action.payload.messages);
      }

      return state;
    case ActionTypes.addMessageToRoom:
      if (state.rooms.has(action.payload.roomname)) {
        let room = state.rooms.get(action.payload.roomname);
        if (room) {
          state.rooms.set(action.payload.roomname, [...room, action.payload]);
        }
      } else {
        state.rooms.set(action.payload.roomname, [action.payload]);
      }
      return state;
    default:
      return state;
  }
}
