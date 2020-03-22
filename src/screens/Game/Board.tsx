import React from 'react';

import { Card as CardType, Move, Player } from '../../types';

import Avatar from '../../components/Avatar';
import StackedCards from '../../components/StackedCards';
import StackedDropzones from './StackedDropzones';

export type BoardProps = {
  lastMove: Move | null;
  lastMovePlayer: Player | null;
  currentPlayer: Player | null;
  dropzoneCards: (CardType | null)[];
  canDropCard: Function;
  onCardDrop: Function;
  onClickPlay: React.MouseEventHandler<HTMLButtonElement>;
};

export function Board({
  lastMove,
  lastMovePlayer,
  currentPlayer,
  dropzoneCards,
  canDropCard,
  onCardDrop,
  onClickPlay,
}: BoardProps) {
  return (
    <div>
      {lastMove?.cards && lastMove.cards.length > 0 && (
        <div className="flex flex-row items-center">
          <div className="mr-8">
            {lastMovePlayer && (
              <Avatar username={lastMovePlayer.username} size={12} />
            )}
          </div>
          <StackedCards cards={lastMove.cards} />
        </div>
      )}
      <div className="flex flex-row items-center mt-8">
        <div className="mr-8">
          {currentPlayer && (
            <Avatar username={currentPlayer.username} size={12} />
          )}
        </div>
        <StackedDropzones
          cards={dropzoneCards}
          canDropCard={canDropCard}
          onCardDrop={onCardDrop}
        />
        <button onClick={onClickPlay}>Play</button>
      </div>
    </div>
  );
}

export default Board;
