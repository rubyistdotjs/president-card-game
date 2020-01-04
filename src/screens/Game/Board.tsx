import React from 'react';

import { Card as CardType } from '../../game/types';

import Avatar from '../../components/Avatar';
import StackedCards from './StackedCards';
import StackedDropzones from './StackedDropzones';

export type BoardProps = {
  stashedCards: CardType[];
  dropzoneCards: (CardType | null)[];
  canDropCard: Function;
  onCardDrop: Function;
};

export function Board({
  stashedCards,
  dropzoneCards,
  canDropCard,
  onCardDrop,
}: BoardProps) {
  return (
    <div>
      {stashedCards.length > 0 && (
        <div className="flex flex-row items-center">
          <div className="mr-8">
            <Avatar size={12} />
          </div>
          <StackedCards cards={stashedCards} />
        </div>
      )}
      <div className="flex flex-row items-center mt-8">
        <div className="mr-8">
          <Avatar size={12} />
        </div>
        <StackedDropzones
          cards={dropzoneCards}
          canDropCard={canDropCard}
          onCardDrop={onCardDrop}
        />
      </div>
    </div>
  );
}

export default Board;
