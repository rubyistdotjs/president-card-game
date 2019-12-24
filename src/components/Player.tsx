import React from 'react';

import Avatar from './Avatar';

export type PlayerProps = {
  username: String;
  remainingCardsCount: number;
};

export function Player({ username, remainingCardsCount }: PlayerProps) {
  return (
    <div className="flex flex-row items-center w-full p-2 bg-gray-900 rounded-lg mb-2">
      <div className="mr-3">
        <Avatar size={12} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="block text-white font-semibold leading-normal">
          {username}
        </span>
        <span className="text-gray-500 text-sm leading-normal">
          {remainingCardsCount} cards
        </span>
      </div>
    </div>
  );
}

export default Player;
