import React from 'react';

import { Card as CardType } from '../../types';

import Card from '../../components/Card';

export type StackedCardsProps = {
  cards: CardType[];
};

export function StackedCards({ cards }: StackedCardsProps) {
  return (
    <div className="flex flex-row">
      {cards.map((card: CardType, index: number) => (
        <div key={`stacked-card-${index}`} className="mr-4">
          <Card symbol={card.symbol} rank={card.rank} />
        </div>
      ))}
    </div>
  );
}

export default StackedCards;
