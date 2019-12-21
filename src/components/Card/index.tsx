import React from 'react';

export type CardProps = {
  symbol: string;
  rank: string;
};

export function Card({ symbol, rank }: CardProps) {
  const images = require.context('./images', false, /\.svg$/);
  const cardImageFilename = `${symbol.toLowerCase()}-${rank.toLowerCase()}.svg`;
  const cardImage = images(`./${cardImageFilename}`);

  return (
    <div className="flex items-center justify-center w-32 h-48 rounded bg-gray-200 select-none">
      <img
        src={cardImage}
        alt={`${rank} of ${symbol}`}
        className="block w-full"
      />
    </div>
  );
}

export default Card;
