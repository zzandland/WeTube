import { connect } from 'react-redux';
import { selectGame, selectOpponent, sendGameRequest, resetRequest } from '../actions/game';
import { socketEmit } from '../actions/websockets';
import Game from '../components/Game';

const mapStateToProps = ({ chatService, inputs, game }) => ({
  self: chatService.self,
  users: chatService.users,
  gameOption: inputs.gameOption,
  opponentOption: inputs.opponentOption,
  isLoading: game.isLoading,
  hasErrored: game.hasErrored,
  isRejected: game.isRejected,
  gameInitiated: game.gameInitiated,
  gamePlaying: game.gamePlaying,
  targetPlayer: game.targetPlayer,
});

const mapDispatchToProps = (dispatch) => ({
  selectGame: game => dispatch(selectGame(game)),
  selectOpponent: user => dispatch(selectOpponent(user)),
  sendGameRequest: data => dispatch(sendGameRequest(data)),
  resetRequest: () => dispatch(resetRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
