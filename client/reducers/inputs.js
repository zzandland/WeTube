export default (state = {}, action) => {
  switch (action.type) {
    case 'HANDLE_MESSAGE_CHANGE':
      return Object.assign({}, state, {
        message: action.message,
      });

    case 'HANDLE_SEARCH_CHANGE':
      return Object.assign({}, state, {
        searchQuery: action.query,
      });
    
    default: 
      return state;
  }
};
