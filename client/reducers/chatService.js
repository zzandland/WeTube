const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_MESSAGES_CHANGE':
      const newMessages = state.messages.slice();
      newMessages.push(action.message);
      return Object.assign({}, state, {
        messages: newMessages,
      });

    default:
      return state;
  }
};
