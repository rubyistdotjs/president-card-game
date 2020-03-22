import React from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';

import { Card as CardType } from '../../types';

import CardDropzone from '../../components/CardDropzone';

export type DropzoneProps = {
  canDropCard: Function;
  onCardDrop: Function;
  index: number;
};

export function Dropzone({ canDropCard, onCardDrop, index }: DropzoneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'HAND_CARD',
    canDrop: (item: DragObjectWithType & CardType) => {
      const { type, ...card } = item;
      return canDropCard(card);
    },
    drop: ({ type, ...card }: DragObjectWithType & CardType) => {
      onCardDrop({ uuid: card.id, index });
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <CardDropzone active={isOver} />
    </div>
  );
}

export default Dropzone;
