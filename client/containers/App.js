import { connect } from 'react-redux';
import { updateMessage, updateMessages, updateUsers } from '../actions/chatService';
import { toggleYoutube, toggleGoogleMap } from '../actions/rendering';
import { socketEmit } from '../actions/websockets';
import App from '../components/App';

const mapStateToProps = ({ inputs, youtubeService, rendering }) => ({
  videoToggle: rendering.videoToggle,
  mapToggle: rendering.mapToggle,
  message: inputs.message,
})

const mapDispatchToProps = dispatch => ({
  changeUsername: username => socketEmit('NEW_USER', { username }),
  toggleGoogleMap: () => dispatch(toggleGoogleMap()),
  getCoordinates: (crd) => socketEmit('SEND_COORDS', crd),
});

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(App);
