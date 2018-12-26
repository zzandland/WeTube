import { connect } from 'react-redux';
import GoogleMap from '../components/GoogleMap';

const mapStateToProps = ({ chatService }) => ({
  users: chatService.users,
});

export default connect(
  mapStateToProps,
  null,
)(GoogleMap);
