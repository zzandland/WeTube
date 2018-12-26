import React, { Component } from 'react';

export default ({ gameOption, opponentOption, selectGame, selectOpponent, users, self }) => {
  const withoutSelf = users.filter(user => {
    return user.name !== self.name;
  })
  return (
    <form>
      <label>
        Game to play:
        <select value={gameOption} onChange={() => { selectGame() }}>
          <option value={"tictactoe"}>Tic Tac Toe</option>
          <option value={"chess"}>Chess</option>
        </select>
      </label>
      <label>
        Who do you want to play with?:
        <select value={opponentOption} onChange={() => { selectOpponent() }}>
          {withoutSelf.map(user => <option value={user.userId}>{user.name}</option>)}
        </select>
      </label>
      <input type="submit" value="Send Request" />
    </form>
  );
};
