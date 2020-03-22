import { createSelector } from 'reselect';

import { Game } from '../../types';
import { State } from '../types';

export const gameSelector = (state: State): Game | null => state.game;

export const turnsSelector = createSelector(
  gameSelector,
  game => game && game.turns
);

export const playersSelector = createSelector(
  gameSelector,
  game => game && game.players
);

export const currentTurnSelector = createSelector(
  turnsSelector,
  turns => turns && turns[turns.length - 1]
);

export const currentTurnMovesSelector = createSelector(
  currentTurnSelector,
  turn => turn && turn.moves
);

export const lastMoveSelector = createSelector(
  currentTurnMovesSelector,
  moves => moves && moves[moves.length - 1]
);

export const lastMoveWithCardsSelector = createSelector(
  currentTurnMovesSelector,
  moves =>
    (moves && moves.reverse().find(m => m.cards && m.cards.length > 0)) || null
);

export const activePlayerSelector = createSelector(
  playersSelector,
  currentTurnSelector,
  lastMoveSelector,
  (players, turn, move) => {
    if (players === null || turn === null) return null;

    if (move === null) {
      return (
        players.find(player => player.id === turn.startingPlayerId) || null
      );
    }

    const lastPlayerIndex = players.findIndex(p => p.id === move.playerId);
    const nextPlayerIndex =
      lastPlayerIndex === players.length - 1 ? 0 : lastPlayerIndex + 1;
    return players[nextPlayerIndex];
  }
);
