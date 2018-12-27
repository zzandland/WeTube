import { socketEmit } from './websockets';

export const requestIsLoading = bool => ({
  type: 'GAME_REQUEST_IS_LOADING',
  isLoading: bool,
});

export const responseCameBack = data => ({
  type: 'GAME_RESPONSE_CAME_BACK',
  data,
});

export const sendGameRequest = (data) => {
  return (dispatch) => {
    dispatch(requestIsLoading(true));
    socketEmit('GAMEPLAY_REQUEST', data);
  }
};

export const gameRequestRespond = (bool) => ({
  type: 'GAME_REQUEST_RESPOND',
  bool,
});

export const selectGame = option => ({
  type: 'HANDLE_GAME_CHANGE',
  option,
});

export const resetRequest = () => ({
  type: 'RESET_GAME_REQUEST',
});

export const selectOpponent = option => ({
  type: 'HANDLE_OPPONENT_CHANGE',
  option
});
