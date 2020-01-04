import { groupSort } from 'fp-ts/lib/NonEmptyArray';
import { sign } from 'fp-ts/lib/Ordering';

import { Action, Card, Move, Player, Stash } from './types';
import { cardWeight } from '../utils/game';

export function printCards(cards: Card[]) {
  console.log(cards.map(card => card.rank).join(' - '));
}

export const groupCards = groupSort({
  equals: (c1: Card, c2: Card): boolean => c1.rank === c2.rank,
  compare: (c1: Card, c2: Card) => sign(cardWeight(c1) - cardWeight(c2)),
});

export function botMove(stash: Stash, player: Player): Move {
  const { cards } = player;
  const groupedCards = groupCards(cards);
  const stashedCards = stash.cards;

  if (stashedCards === null) {
    const smallestCards = groupedCards[0];

    // Check if only 2 remaining after move

    return {
      action: Action.PLAY,
      cards: smallestCards,
      playerUuid: player.uuid,
    };
  }

  const stashedCardsCount = stashedCards.length;
  const stashedCardsWeight = cardWeight(stashedCards[0]);

  const playableGroupedCards = groupedCards.filter(cards => {
    if (cards.length !== stashedCardsCount) return false;

    const cardsWeight = cardWeight(cards[0]);
    return stash.locked
      ? cardsWeight === stashedCardsWeight
      : cardsWeight >= stashedCardsWeight;
  });

  // Check for 2s

  if (playableGroupedCards.length > 0) {
    return {
      action: Action.PLAY,
      cards: playableGroupedCards[0],
      playerUuid: player.uuid,
    };
  } else {
    return {
      action: stash.locked ? Action.SKIP : Action.PASS,
      cards: null,
      playerUuid: player.uuid,
    };
  }
}

export function makeMove() {
  return null;
}
