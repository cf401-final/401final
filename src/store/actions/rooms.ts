import { ActionTypes, Message, Room } from './types';

export interface SetRoomsAction {
  type: ActionTypes.setRooms;
  payload: Room[];
}

export interface AddMessageToRoomAction {
  type: ActionTypes.addMessageToRoom;
  payload: Message;
}

export interface SetRoomMessagesAction {
  type: ActionTypes.setRoomMessages;
  payload: Room;
}

export const setRooms = (payload: Room[]): SetRoomsAction => {
  return {
    type: ActionTypes.setRooms,
    payload,
  };
};

export const addMessageToRoom = (payload: Message): AddMessageToRoomAction => {
  return {
    type: ActionTypes.addMessageToRoom,
    payload,
  };
};

export const setRoomMessages = (payload: Room): SetRoomMessagesAction => {
  return {
    type: ActionTypes.setRoomMessages,
    payload,
  };
};
