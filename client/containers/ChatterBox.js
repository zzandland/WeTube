import { connect } from 'react-redux';
import { updateMessage, updateName } from '../actions/chatService';
import { toggleYoutube } from '../actions/youtubeService';
import { socketEmit } from '../actions/websockets';
import ChatterBox from '../components/ChatterBox';

const mapStateToProps = ({ inputs, chatService, youtubeService }) => ({
  message: inputs.message,
  name: inputs.name,
  messages: chatService.messages,
  users: chatService.users,
  current: youtubeService.current,
});

const mapDispatchToProps = dispatch => ({
  handleMessageChange: message => dispatch(updateMessage(message)),
  handleNameChange: name => dispatch(updateName(name)),
  changeUsername: username => socketEmit('NEW_USER', { username }),
  sendMessage: message => socketEmit('NEW_MESSAGE', message),
  toggleYoutube: () => dispatch(toggleYoutube()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatterBox);
