import io from 'socket.io-client';
import { requestIsLoading, responseCameBack } from './game';

const socket = io();
const messageTypes = ['NEW_VIDEO', 'UPDATE_USERS', 'UPDATE_SELF', 'UPDATE_MESSAGES', 'GAMEPLAY_RECEIVED'];

export const socketInit = (store) => {
  messageTypes.forEach(type => socket.on(type, payload => {
    store.dispatch({ type, payload })
  }));
  socket.on('GAMEPLAY_RESPONSE', data => {
    store.dispatch(requestIsLoading(false));
    store.dispatch(responseCameBack(data));
  });
};

export const socketEmit = (type, payload) => {
  socket.emit(type, payload);
};
