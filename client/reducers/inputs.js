export default (state = {}, action) => {
  switch (action.type) {
    case 'HANDLE_MESSAGE_CHANGE':
      return Object.assign({}, state, {
        message: action.message,
      });
    
    default: 
      return state;
  }
};
