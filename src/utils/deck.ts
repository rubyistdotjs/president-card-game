export const numbers: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const heads: string[] = ['JACK', 'QUEEN', 'KING', 'ACE'];
export const ranks: string[] = [...numbers, ...heads];
export const symbols: string[] = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

export interface Card {
  readonly rank: string;
  readonly symbol: string;
}

export const suits: Card[] = symbols.flatMap(symbol =>
  ranks.map(rank => ({ rank, symbol }))
);

export const deck: Card[] = [...suits];

export default deck;
