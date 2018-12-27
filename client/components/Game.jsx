import React, { Component } from 'react';
import GameBoard from '../containers/GameBoard';

export default ({ gameOption, opponentOption, selectGame, selectOpponent, sendGameRequest, isLoading, hasErrored, isRejected, gameInitiated, gamePlaying, users, self, targetPlayer, resetRequest }) => {
  const withoutSelf = users.filter(user => {
    return user.name !== self.name;
  })
  if (isLoading) {
    const opponentIndex = withoutSelf.map(user => user.userId).indexOf(opponentOption);
    const opponentName = withoutSelf[opponentIndex].name;
    return <div>Sending request to...{opponentName}</div>;
  } else if (hasErrored) {
    return <div>Error</div>;
  } else if (isRejected) {
    return (
      <div>
        <p>{targetPlayer} refused to play together</p>
        <button onClick={() => { resetRequest() }}>Close</button>
      </div>
    );
  } else if (gameInitiated) {
    return <GameBoard />;
  } else {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (gameOption !== '' && opponentOption !== '') {
            const data = {
              game: gameOption,
              challenger: self.userId,
              recipient: opponentOption,
            };
            sendGameRequest(data);
          }
        }}
      >
        <select value={gameOption} onChange={(event) => { selectGame(event.target.value) }}>
          <option value="">Game to play:</option>
          <option value="tictactoe">Tic Tac Toe</option>
          <option value="chess">Chess</option>
        </select>
        <select value={opponentOption} onChange={(event) => { selectOpponent(event.target.value) }}>
          <option value="">Choose opponent</option>
          {withoutSelf.map(user => <option value={user.userId}>{user.name}</option>)}
        </select>
        <input type="submit" value="Send Request" />
      </form>
    );
  }
};
