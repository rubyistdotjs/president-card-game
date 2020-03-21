import { Game } from '../../types';
import {
  INIT_GAME,
  InitGame,
  ADD_TURN,
  AddTurn,
  ADD_MOVE,
  AddMove,
} from '../actions/game';

export type GameState = Game | null;
export type GameTypes = InitGame | AddTurn | AddMove;

export function gameReducer(
  state: GameState = null,
  action: GameTypes
): GameState {
  switch (action.type) {
    case INIT_GAME:
      return {
        id: action.payload.id,
        players: action.payload.players,
        turns: [
          {
            startingPlayerId: action.payload.startingPlayerId,
            moves: null,
          },
        ],
      };
    case ADD_TURN:
      if (state === null) return state; // Can't do an early return on null and type not init_game because TypeScript ...

      return {
        ...state,
        turns: [
          ...state.turns,
          { startingPlayerId: action.payload.startingPlayerId, moves: null },
        ],
      };
    case ADD_MOVE:
      if (state === null) return state;

      const previousTurns = state.turns.slice(0, -1);
      const currentTurn = state.turns[state.turns.length - 1];
      const currentTurnMoves = currentTurn.moves || [];

      const playerId = action.payload.player.id;
      const playerIndex = state.players.findIndex(p => p.id === playerId);
      const playedCardIds = action.payload.cards
        ? action.payload.cards.map(c => c.id)
        : null;

      return {
        ...state,
        turns: [
          ...previousTurns,
          {
            ...currentTurn,
            moves: [
              ...currentTurnMoves,
              {
                playerId: playerId,
                action: action.payload.action,
                cards: action.payload.cards || null,
              },
            ],
          },
        ],
        players: playedCardIds
          ? [
              ...state.players.slice(0, playerIndex),
              {
                ...state.players[playerIndex],
                remainingCards: [
                  ...state.players[playerIndex].remainingCards.filter(
                    c => !playedCardIds.includes(c.id)
                  ),
                ],
              },
              ...state.players.slice(playerIndex + 1),
            ]
          : state.players,
      };
    default:
      return state;
  }
}
