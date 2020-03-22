import React from 'react';
import { useSelector } from 'react-redux';

import { playersWithLastMove } from '../../store/selectors/game';

import Player from '../../components/Player';

export function PlayerList() {
  const players = useSelector(playersWithLastMove);

  if (players === null) return null;

  return (
    <div>
      {players.map(player => (
        <Player
          key={player.id}
          username={player.username}
          remainingCardsCount={player.remainingCards.length}
          active={false}
          lastMove={player.lastMove}
        />
      ))}
    </div>
  );
}

export default PlayerList;
