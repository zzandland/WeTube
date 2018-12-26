import { combineReducers } from 'redux';
import inputs from './inputs';
import chatService from './chatService';
import youtubeService from './youtubeService';

export default combineReducers({
  inputs,
  chatService,
  youtubeService,
});
