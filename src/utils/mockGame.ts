import uuid from 'uuid/v4';
import { deck, Card as DeckCard } from './deck';

import { chunksOf } from 'fp-ts/lib/Array';

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

export type Move = {
  uuid: string;
  playerUuid: string;
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

export function shuffle(array: any[]): any[] {
  const shuffledArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export function identifyCard(card: DeckCard): Card {
  return { uuid: uuid(), ...card };
}

export function distributeCards(
  players: number,
  minCardsPerPlayer: number = 6
): Card[][] {
  const decksCount: number = Math.ceil(
    (minCardsPerPlayer * players) / deck.length
  );

  const decks: DeckCard[][] = Array(decksCount).fill(deck);
  const cards: Card[] = decks.flat().map(identifyCard);

  const shuffledCards: Card[] = shuffle(cards);
  const cardsPerPlayer = Math.floor(shuffledCards.length / players);
  const hands: Card[][] = chunksOf(cardsPerPlayer)(shuffledCards);

  if (hands.length === players) return hands;

  const remainingCards: Card[] = hands[hands.length - 1];
  const unevenHands: Card[][] = hands
    .slice(0, -1)
    .map((cards: Card[], i: number) => {
      const card: Card = remainingCards[i];
      return card ? [...cards, card] : cards;
    });

  return shuffle(unevenHands);
}

export function initializePlayers(): Player[] {
  const defaultPlayers: Player[] = [
    { uuid: uuid(), username: 'Arya', cards: [] },
    { uuid: uuid(), username: 'Sansa', cards: [] },
    { uuid: uuid(), username: 'Jon', cards: [] },
    { uuid: uuid(), username: 'Brandon', cards: [] },
    { uuid: uuid(), username: 'Rickon', cards: [] },
    { uuid: uuid(), username: 'Robb', cards: [] },
    { uuid: uuid(), username: 'Player', cards: [] },
  ];

  const players: Player[] = shuffle(defaultPlayers);
  const hands: Card[][] = distributeCards(players.length);

  return players.map((player: Player, i: number) => ({
    ...player,
    cards: hands[i],
  }));
}

export function initializeTurns(firstPlayer: Player): Turn[] {
  return [
    {
      startingPlayerUuid: firstPlayer.uuid,
      stash: [],
      moves: [],
    },
  ];
}

export function generateGame(): Game {
  const players: Player[] = initializePlayers();
  const turns: Turn[] = initializeTurns(players[0]);

  return {
    uuid: uuid(),
    players,
    turns,
    startedAt: new Date(),
    endedAt: null,
  };
}
