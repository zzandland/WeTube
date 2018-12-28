const initialState = {
  videoToggle: false,
  mapToggle: false,
  gameToggle: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_YOUTUBE':
      return Object.assign({}, state, {
        videoToggle: !state.videoToggle,
      })

    case 'TOGGLE_MAP':
      return Object.assign({}, state, {
        mapToggle: !state.mapToggle,
      })

    case 'TOGGLE_GAME':
      return Object.assign({}, state, {
        gameToggle: action.bool === undefined ? !state.gameToggle : action.bool 
      })

    default:
      return state;
  }
};
