const initialState = {
  message: '',
  name: '',
  searchQuery: '',
  gameOption: '',
  opponentOption: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_MESSAGE_CHANGE':
      return Object.assign({}, state, {
        message: action.message,
      });

    case 'HANDLE_NAME_CHANGE':
      return Object.assign({}, state, {
        name: action.name,
      });

    case 'HANDLE_SEARCH_CHANGE':
      return Object.assign({}, state, {
        searchQuery: action.query,
      });

    case 'HANDLE_GAME_CHANGE':
      return Object.assign({}, state, {
        gameOption: action.option, 
      });

    case 'HANDLE_OPPONENT_CHANGE':
      return Object.assign({}, state, {
        opponentOption: action.option, 
      });
    
    default: 
      return state;
  }
};
