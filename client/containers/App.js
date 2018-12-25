import { connect } from 'react-redux';
import { updateMessage, updateMessages, updateUsers } from '../actions';
import App from '../components/App';

const mapStateToProps = ({ inputs }) => ({
  message: inputs.message,
})

const mapDispatchToProps = dispatch => ({
  handleMessageChange: message => dispatch(updateMessage(message)),
  handleMessagesChange: messages => dispatch(updateMessages(messages)),
  handleUsersChange: userList => dispatch(updateUsers(userList)),
});

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(App);
