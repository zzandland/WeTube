import { connect } from 'react-redux';
import { socketEmit } from '../actions/websockets';
import { clearSearch } from '../actions/youtubeService';
import Video from '../components/Video';

const mapDispatchToProps = (dispatch) => ({
  shareVideo: (video) => {
    socketEmit('SHARE_VIDEO', video);
    dispatch(clearSearch());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Video);
