const initialState = {
  messages: [],
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_MESSAGES_CHANGE':
      const newMessages = state.messages.slice();
      newMessages.push(action.message);
      return Object.assign({}, state, {
        messages: newMessages,
      });

    case 'HANDLE_USERS_CHANGE':
      return Object.assign({}, state, {
        users: action.users, 
      });

    default:
      return state;
  }
};
