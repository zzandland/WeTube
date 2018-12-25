import { connect } from 'react-redux';
import { updateMessage } from '../actions';
import ChatterBox from '../components/ChatterBox';

const mapStateToProps = ({ inputs, chatService }) => ({
  message: inputs.message,
  messages: chatService.messages,
  users: chatService.users,
});

const mapDispatchToProps = dispatch => ({
  handleMessageChange: message => dispatch(updateMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatterBox);
