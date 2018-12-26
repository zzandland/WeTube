const initialState = {
  messages: [],
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      const newMessages = state.messages.slice();
      newMessages.push(action.payload);
      return Object.assign({}, state, {
        messages: newMessages,
      });

    case 'UPDATE_USERS':
      return Object.assign({}, state, {
        users: action.payload, 
      });

    default:
      return state;
  }
};
