import { connect } from 'react-redux';
import { updateSearchQuery, updateUsers } from '../actions';
import Search from '../components/Search';

const mapStateToProps = ({ inputs, chatService }) => ({
  searchQuery: inputs.searchQuery,
  users: chatService.users,
})

const mapDispatchToProps = dispatch => ({
  handleSearchChange: query => dispatch(updateSearchQuery(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
