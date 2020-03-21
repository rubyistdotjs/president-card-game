export type User = {
  id: string;
  username: string;
};

export type Player = {
  id: string;
  username: string;
  cards: Card[];
  remainingCards: Card[];
};

export type Card = {
  id: string;
  rank: string;
  symbol: string;
};

export enum Action {
  'PASS',
  'SKIP',
  'PLAY',
}

export type Move = {
  playerId: string;
  action: Action;
  cards: Card[] | null;
};

export type Turn = {
  startingPlayerId: string;
  moves: Move[] | null;
};

export type Game = {
  id: string;
  players: Player[];
  turns: Turn[];
};
