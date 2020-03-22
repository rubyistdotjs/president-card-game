import React from 'react';

import { Card as CardType } from '../../types';

import DraggableCard from './DraggableCard';
import Dropzone from './Dropzone';

export type StackedDropzonesProps = {
  cards: (CardType | null)[];
  canDropCard: Function;
  onCardDrop: Function;
};

export function StackedDropzones({
  cards,
  canDropCard,
  onCardDrop,
}: StackedDropzonesProps) {
  return (
    <div className="flex flex-row">
      {cards.map((card: CardType | null, index: number) => (
        <div key={`stacked-dropzone-${index}`} className="mr-4">
          {card === null ? (
            <Dropzone
              canDropCard={canDropCard}
              onCardDrop={onCardDrop}
              index={index}
            />
          ) : (
            <DraggableCard type="DROPZONE_CARD" card={card} />
          )}
        </div>
      ))}
    </div>
  );
}

export default StackedDropzones;
