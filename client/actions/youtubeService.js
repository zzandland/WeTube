import axios from 'axios';

const searchIsLoading = (bool) => ({
  type: 'SEARCH_IS_LOADING',
  isLoading: bool,
});

const searchHasErrored = (bool) => ({
  type: 'SEARCH_HAS_ERRORED',
  hasErrored: bool,
});

const searchHasSucceeded = (videos) => ({
  type: 'SEARCH_HAS_SUCCEEDED',
  videos,
});

export const searchYoutube = (searchQuery) => {
  return (dispatch) => {
    dispatch(searchIsLoading(true));

    axios.post('/api/search', { searchQuery })
      .then(response => {
        dispatch(searchIsLoading(false));
        dispatch(searchHasSucceeded(response.data));
      })
      .catch(() => dispatch(searchHasErrored(true)));
  };
};

export const shareCurrentVideo = (video) => ({
  type: 'SHARE_VIDEO',
  video,
});
