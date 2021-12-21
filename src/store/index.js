import { createStore, combineReducers } from 'redux';

import messagesReducer from './messages';


let reducers = combineReducers({ 
  messages: messagesReducer,
});

const store = () => {
  return createStore(reducers);
};

export default store;