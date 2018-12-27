const initialState = {
  isLoading: false,
  hasErrored: false,
  isRejected: false,
  hasReceived: false,
  receivedData: {},
  gameInitiated: false,
  gamePlaying: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_REQUEST_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });

    case 'GAME_REQUEST_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored, 
      });

    case 'GAME_RESPONSE_CAME_BACK':
      let response = {};
      if (action.data.response) {
        response = {
          gameInitiated: true,
          gamePlaying: action.data.game,
        };
      } else {
        response = {
          isRejected: true,
          targetPlayer: action.data.sender,
        };
      }
      return Object.assign({}, state, response);

    case 'RESET_GAME_REQUEST':
      return Object.assign({}, state, {
        isRejected: false,
        targetPlayer: undefined,
      });

    case 'GAMEPLAY_RECEIVED':
      return Object.assign({}, state, {
        hasReceived: true,
        receivedData: action.payload,
      });

    case 'GAME_REQUEST_RESPOND':
      let answer = {};
      if (action.bool) {
        answer = {
          gameInitiated: true,
          gamePlaying: state.receivedData.game,
        }
      }
      return Object.assign({}, state, answer, {
        hasReceived: false,
        receivedData: {},
      });

    default:
      return state;
  }
};
