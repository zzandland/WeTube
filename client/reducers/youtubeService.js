const initialState = {
  current: { etag: '' },
  videos: [],
  isLoading: false,
  hasErrored: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading, 
      });

    case 'SEARCH_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored,
      });

    case 'SEARCH_HAS_SUCCEEDED':
      return Object.assign({}, state, {
        videos: action.videos,
      });

    case 'NEW_VIDEO':
      return Object.assign({}, state, {
        current: action.payload,
      });

    case 'CLEAR_SEARCH':
      return Object.assign({}, state, {
        videos: [],
        videoToggle: false,
      })
      
    default:
      return state;
  }
};
