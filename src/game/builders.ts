import { chunksOf } from 'fp-ts/lib/Array';

import { deck, Card as DeckCard } from './deck';
import { User, Player, Card, Turn, Game } from '../types';
import { withId, shuffle } from './utils';

export function buildHands(
  players: number,
  minCardsPerPlayer: number = 6
): Card[][] {
  const decksCount: number = Math.ceil(
    (minCardsPerPlayer * players) / deck.length
  );

  const decks: DeckCard[][] = Array(decksCount).fill(deck);
  const cards: Card[] = decks.flat().map(withId);

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

export function buildBot(username: string): User {
  return withId({ username });
}

export function buildBots(usernames: string[]): User[] {
  return usernames.map(buildBot);
}

export function buildPlayer(user: User): Player {
  return {
    id: user.id,
    username: user.username,
    cards: [],
    remainingCards: [],
  };
}

export function buildPlayers(users: User[]): Player[] {
  const shuffledUsers = shuffle(users);
  const players: Player[] = shuffledUsers.map(buildPlayer);
  const hands: Card[][] = buildHands(players.length);

  return players.map(
    (player: Player, i: number): Player => ({
      ...player,
      cards: hands[i],
      remainingCards: hands[i],
    })
  );
}

export function buildTurn(player: Player): Turn {
  return {
    startingPlayerId: player.id,
    moves: [],
  };
}

export function buildGame(users: User[]): Game {
  const players: Player[] = buildPlayers(users);
  const firstPlayer = players[0];

  const firstTurn: Turn = buildTurn(firstPlayer);
  const turns: Turn[] = [firstTurn];

  const game = {
    players,
    turns,
    startedAt: new Date(),
    endedAt: null,
  };

  return withId(game);
}
