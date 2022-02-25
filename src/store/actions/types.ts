import {
  SetRoomsAction,
  AddMessageToRoomAction,
  SetRoomMessagesAction,
} from './rooms';

export enum ActionTypes {
  setRooms,
  addMessageToRoom,
  setRoomMessages,
}

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
  messages?: Message[];
  users?: string[];
  password?: string;
};

export type Rooms = {
  rooms: Map<string, Message[]>;
};

export type Action =
  | SetRoomsAction
  | AddMessageToRoomAction
  | SetRoomMessagesAction;
