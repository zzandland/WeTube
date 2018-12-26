import { connect } from 'react-redux';
import VideoList from '../components/VideoList';

const mapStateToProps = ({ youtubeService }) => ({
  videos: youtubeService.videos,
});

export default connect(
  mapStateToProps,
  null,
)(VideoList);
