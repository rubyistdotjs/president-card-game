import React from 'react';

export type CardProps = {
  symbol: string;
  rank: string;
};

export function Card({ symbol, rank }: CardProps) {
  return (
    <div className="flex items-center justify-center w-32 h-48 rounded-lg bg-gray-200 select-none">
      <span className="text-gray-900 text-xs font-semibold">
        {rank} of {symbol}
      </span>
    </div>
  );
}

export default Card;
