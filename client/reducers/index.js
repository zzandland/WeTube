import { combineReducers } from 'redux';
import inputs from './inputs';
import chatService from './chatService';
import youtubeService from './youtubeService';
import rendering from './rendering';

export default combineReducers({
  inputs,
  chatService,
  youtubeService,
  rendering,
});
