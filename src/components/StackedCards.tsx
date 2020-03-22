import React from 'react';

import { Card as CardType } from '../types';

import Card from './Card';

export type StackedCardsProps = {
  cards: CardType[];
  width?: number;
  height?: number;
};

export function StackedCards({ cards, width, height }: StackedCardsProps) {
  return (
    <div className="flex flex-row">
      {cards.map((card: CardType, index: number) => (
        <div key={`stacked-card-${index}`} className="mr-4">
          <Card
            symbol={card.symbol}
            rank={card.rank}
            width={width}
            height={height}
          />
        </div>
      ))}
    </div>
  );
}

export default StackedCards;
