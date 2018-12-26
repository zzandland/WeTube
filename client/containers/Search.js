import { connect } from 'react-redux';
import { updateSearchQuery, updateUsers } from '../actions/chatService';
import { searchYoutube } from '../actions/youtubeService';
import Search from '../components/Search';

const mapStateToProps = ({ inputs, chatService, youtubeService }) => ({
  searchQuery: inputs.searchQuery,
  users: chatService.users,
})

const mapDispatchToProps = dispatch => ({
  handleSearchChange: query => dispatch(updateSearchQuery(query)),
  searchVideo: searchQuery => dispatch(searchYoutube(searchQuery)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
