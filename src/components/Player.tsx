import React from 'react';
import classnames from 'classnames';

import Avatar from './Avatar';
import { Move, Action } from '../types';
import StackedCards from './StackedCards';

export type PlayerProps = {
  username: string;
  remainingCardsCount: number;
  active: boolean;
  lastMove: Move | null;
};

export function Player({
  username,
  active,
  lastMove,
  remainingCardsCount,
}: PlayerProps) {
  const classes = classnames(
    'flex flex-row items-center w-full p-2 rounded-lg mb-2',
    { 'bg-gray-900': !active, 'bg-gray-800': active }
  );

  return (
    <div className={classes}>
      <div className="mr-3">
        <Avatar username={username} size={12} />
      </div>
      <div className="flex flew-row w-full justify-between">
        <div className="flex flex-col justify-center mr-3">
          <span className="block text-white font-semibold leading-normal">
            {username}
          </span>
          <span className="text-gray-500 text-sm leading-normal">
            {remainingCardsCount} cards
          </span>
        </div>
        <div className="h-12 overflow-hidden">
          {lastMove?.cards && lastMove.cards.length > 0 && (
            <StackedCards cards={lastMove.cards} width={8} height={12} />
          )}
          {lastMove?.action === Action.PASS && <span>passed</span>}
          {lastMove?.action === Action.SKIP && <span>skipped</span>}
        </div>
      </div>
    </div>
  );
}

export default Player;
