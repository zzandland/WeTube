import io from 'socket.io-client';

const socket = io();
const messageTypes = ['change_video', 'clients_connected', 'new_message'];

export const socketInit = (store) => {
  messageTypes.forEach(type => socket.on(type, (payload) => (
    store.dispatch({ type, payload });
  )));
};

export const socketEmit = (type, payload) => {
  socket.emit(type, payload);
};
