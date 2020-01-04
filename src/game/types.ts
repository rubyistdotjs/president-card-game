export type User = {
  uuid: string;
  username: string;
};

export type Card = {
  uuid: string;
  rank: string;
  symbol: string;
};

export type Player = {
  uuid: string;
  username: string;
  cards: Card[];
};

export enum Action {
  'PASS',
  'SKIP',
  'PLAY',
}

export type Move = {
  uuid: string;
  playerUuid: string;
  action: Action;
  cards: Card[];
};

export type Turn = {
  startingPlayerUuid: string;
  stash: Card[];
  moves: Move[];
};

export type Game = {
  uuid: string;
  players: Player[];
  turns: Turn[];
  startedAt: Date;
  endedAt: Date | null;
};
