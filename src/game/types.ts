export type User = {
  uuid: string;
  username: string;
};

export type Card = {
  uuid: string;
  rank: string;
  symbol: string;
};

export type Stash = {
  cards: Card[];
  locked: boolean;
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
  playerUuid: string;
  action: Action;
  cards: Card[] | null;
};

export type Turn = {
  startingPlayerUuid: string;
  stash: Stash | null;
  moves: Move[];
};

export type Game = {
  uuid: string;
  players: Player[];
  turns: Turn[];
  startedAt: Date;
  endedAt: Date | null;
};
