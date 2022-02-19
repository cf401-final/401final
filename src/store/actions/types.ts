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

export type Action =
  | SetRoomsAction
  | AddMessageToRoomAction
  | SetRoomMessagesAction;
