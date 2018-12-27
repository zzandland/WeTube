import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';

const mapStateToProps = ({ game }) => ({
  gamePlaying: game.gamePlaying,
});

export default connect(
  mapStateToProps,
  null,
)(GameBoard)
