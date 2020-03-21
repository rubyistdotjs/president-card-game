import uuid from 'uuid/v4';
import { Action, Player, Card } from '../../types';

export const INIT_GAME = 'INIT_GAME';
export const ADD_TURN = 'ADD_TURN';
export const ADD_MOVE = 'ADD_MOVE';

export type InitGame = {
  type: typeof INIT_GAME;
  payload: {
    id: string;
    players: Player[];
    startingPlayerId: string;
  };
};

export function initGame(players: Player[]): InitGame {
  return {
    type: INIT_GAME,
    payload: {
      id: uuid(),
      players: players,
      startingPlayerId: players[0].id,
    },
  };
}

export type AddTurn = {
  type: typeof ADD_TURN;
  payload: {
    startingPlayerId: string;
  };
};

export function addTurn(player: Player): AddTurn {
  return {
    type: ADD_TURN,
    payload: {
      startingPlayerId: player.id,
    },
  };
}

export type AddMove = {
  type: typeof ADD_MOVE;
  payload: {
    player: Player;
    action: Action;
    cards?: Card[] | null;
  };
};

export function addMove(
  player: Player,
  action: Action,
  cards: Card[] | null = null
): AddMove {
  return {
    type: ADD_MOVE,
    payload: {
      player,
      action,
      cards,
    },
  };
}
