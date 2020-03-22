import React from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';

import { Card as CardType } from '../../types';
import { sortCards } from '../../utils/game';

import DraggableCard from './DraggableCard';

export type HandProps = {
  cards: CardType[];
  onCardDrop: Function;
};

export function Hand({ cards, onCardDrop }: HandProps) {
  const [, drop] = useDrop({
    accept: 'DROPZONE_CARD',
    drop: ({ id }: DragObjectWithType & CardType) => {
      onCardDrop({ id });
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  const sortedCards = sortCards(cards);

  return (
    <div ref={drop}>
      <div className="flex flex-row">
        {sortedCards.map((card: CardType, index: number) => (
          <div key={card.id} className="-mr-16 hover:-mt-6 shadow-2xl">
            <DraggableCard type="HAND_CARD" card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hand;
