import React from 'react';
import classNames from 'classnames';

export type CardProps = {
  symbol: string;
  rank: string;
  width?: number;
  height?: number;
};

export function Card({ symbol, rank, width = 32, height = 48 }: CardProps) {
  const images = require.context('./images', false, /\.svg$/);
  const cardImageFilename = `${symbol.toLowerCase()}-${rank.toLowerCase()}.svg`;
  const cardImage = images(`./${cardImageFilename}`);

  return (
    <div
      className={classNames(
        `w-${width}`,
        `h-${height}`,
        'flex items-center justify-center rounded bg-gray-200 select-none'
      )}
    >
      <img
        src={cardImage}
        alt={`${rank} of ${symbol}`}
        className="block w-full"
      />
    </div>
  );
}

export default Card;
