import React from 'react';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';

import { Card as CardType } from '../../types';

import Card from '../../components/Card';

export type DraggableCardProps = {
  card: CardType;
  type: string;
};

export function DraggableCard({ type, card }: DraggableCardProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type, ...card },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dragClassNames = classNames('cursor-grab active:cursor-grab', {
    invisible: isDragging,
  });

  return (
    <div ref={drag} className={dragClassNames}>
      <Card symbol={card.symbol} rank={card.rank} />
    </div>
  );
}

export default DraggableCard;
