import { connect } from 'react-redux';
import { updateMessage, updateMessages, updateUsers } from '../actions/chatService';
import { toggleYoutube } from '../actions/youtubeService';
import { socketEmit } from '../actions/websockets';
import App from '../components/App';

const mapStateToProps = ({ inputs, youtubeService }) => ({
  videoToggle: youtubeService.videoToggle,
  message: inputs.message,
})

const mapDispatchToProps = dispatch => ({
  changeUsername: username => socketEmit('NEW_USER', { username }),
});

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(App);
