const initialState = {
  videoToggle: false,
  mapToggle: false,
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

    default:
      return state;
  }
};
