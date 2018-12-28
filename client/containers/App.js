import { connect } from 'react-redux';
import { updateMessage, updateMessages, updateUsers } from '../actions/chatService';
import { toggleYoutube, toggleGoogleMap, toggleGame } from '../actions/rendering';
import { sendGameResponse, gameRequestRespond } from '../actions/game';
import { socketEmit } from '../actions/websockets';
import App from '../components/App';

const mapStateToProps = ({ inputs, chatService, youtubeService, rendering, game }) => ({
  users: chatService.users,
  self: chatService.self,
  videoToggle: rendering.videoToggle,
  mapToggle: rendering.mapToggle,
  gameToggle: rendering.gameToggle,
  hasReceived: game.hasReceived,
  receivedData: game.receivedData,
})

const mapDispatchToProps = dispatch => ({
  toggleGoogleMap: () => dispatch(toggleGoogleMap()),
  toggleGamePlay: () => dispatch(toggleGame()),
  changeUsername: username => socketEmit('NEW_USER', { username }),
  getCoordinates: (crd) => socketEmit('SEND_COORDS', crd),
  sendGameResponse: data => {
    socketEmit('SEND_RESPONSE', data);
    dispatch(toggleGame(data.response));
    dispatch(gameRequestRespond(data.response));
  },
});

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(App);
