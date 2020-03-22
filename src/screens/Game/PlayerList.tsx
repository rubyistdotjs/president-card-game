import React from 'react';
import { useSelector } from 'react-redux';

import { playersSelector, lastMoveSelector } from '../../store/selectors/game';

import Player from '../../components/Player';

export function PlayerList() {
  const players = useSelector(playersSelector);
  const lastMove = useSelector(lastMoveSelector);

  if (players === null) return null;

  return (
    <div>
      {players.map(player => (
        <Player
          key={player.id}
          username={player.username}
          remainingCardsCount={player.remainingCards.length}
          active={false}
        />
      ))}
    </div>
  );
}

export default PlayerList;
