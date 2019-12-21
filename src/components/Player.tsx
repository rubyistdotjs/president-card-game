import React from 'react';

import Avatar from './Avatar';

export type PlayerProps = {
  username: String;
  remainingCardsCount: number;
};

export function Player({ username, remainingCardsCount }: PlayerProps) {
  return (
    <div className="flex flex-row items-center w-full p-2 bg-gray-800 rounded-lg mb-2">
      <div className="mr-2">
        <Avatar size={10} />
      </div>
      <div>
        <span className="block text-white font-semibold leading-none">
          {username}
        </span>
        <span className="text-gray-600 text-sm leading-none">
          {remainingCardsCount} cards
        </span>
      </div>
    </div>
  );
}

export default Player;
