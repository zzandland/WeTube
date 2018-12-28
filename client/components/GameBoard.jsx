import React from 'react';
import TicTacToe from './TicTacToe';
import Chess from './Chess';

export default ({ gamePlaying }) => {
  if (gamePlaying === 'tictactoe') {
    return <TicTacToe />;
  } else if (gamePlaying === 'chess') {
    return <Chess />;
  }
}
