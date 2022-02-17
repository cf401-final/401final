import { createStore, combineReducers } from 'redux';
import { Rooms } from './actions';

import roomsReducer from './reducers/rooms';

export interface StoreState {
  rooms: Rooms;
}

let reducers = combineReducers<StoreState>({
  rooms: roomsReducer,
});

const store = () => {
  return createStore(reducers);
};

export default store;
