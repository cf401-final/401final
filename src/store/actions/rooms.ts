/* eslint no-undef: 0 */
import { ActionTypes } from './types';

export type Message = {
  roomname: string;
  username: string;
  content: string;
  timestamp: string;
  _id?: string;
  __v?: number;
};

export type Room = {
  roomname: string;
  messages: Message[];
};

export type Rooms = {
  rooms: Map<string, Message[]>;
};

export interface SetRoomsAction {
  type: ActionTypes.setRooms;
  payload: string[];
}

export interface AddMessageToRoomAction {
  type: ActionTypes.addMessageToRoom;
  payload: Message;
}

export interface SetRoomMessagesAction {
  type: ActionTypes.setRoomMessages;
  payload: Room;
}

export const setRooms = (payload: string[]): SetRoomsAction => {
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
