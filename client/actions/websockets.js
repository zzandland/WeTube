import io from 'socket.io-client';

const socket = io();
const messageTypes = ['NEW_VIDEO', 'UPDATE_USERS', 'UPDATE_MESSAGES'];

export const socketInit = (store) => {
  messageTypes.forEach(type => socket.on(type, payload => {
    store.dispatch({ type, payload })
  }));
};

export const socketEmit = (type, payload) => {
  socket.emit(type, payload);
};
