import { combineReducers } from 'redux';
import inputs from './inputs';
import chatService from './chatService';

export default combineReducers({
  inputs,
  chatService,
});
