export const numbers: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const heads: string[] = ['jack', 'queen', 'king', 'ace'];
export const ranks: string[] = [...numbers, ...heads];
export const symbols: string[] = ['hearts', 'diamonds', 'clubs', 'spades'];

interface Card {
  readonly rank: string;
  readonly symbol: string;
}

export const suits: Card[] = symbols.flatMap(symbol =>
  ranks.map(rank => ({ rank, symbol }))
);
export const jokers: Card[] = Array(2).fill({ rank: 'joker', symbol: 'joker' });
export const deck: Card[] = [...jokers, ...suits];

export default deck;
