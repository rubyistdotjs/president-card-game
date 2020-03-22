import { Card } from '../types';

export const cardRankWeights: string[] = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'QUEEN',
  'KING',
  'ACE',
  '2',
  'JOKER',
];

export function sortCards(cards: Card[]): Card[] {
  return cards.sort((a, b) => cardWeight(a) - cardWeight(b));
}

export function cardWeight(card: Card): number {
  return cardRankWeights.indexOf(card.rank);
}

export function canPlayCard(
  stashedCards: Card[],
  playedCards: Card[],
  card: Card
): boolean {
  if (stashedCards.length === 0 && playedCards.length === 0) return true;

  const weight = cardWeight(card);

  if (playedCards.length > 0) {
    const playedCardsWeight = cardWeight(playedCards[0]);
    if (playedCardsWeight !== weight) return false;
  }

  const stashedCardsWeight = cardWeight(stashedCards[0]);
  return weight >= stashedCardsWeight;
}
