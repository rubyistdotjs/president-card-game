import React from 'react';
import classNames from 'classnames';

export type CardDropzone = {
  isValidDrop?: boolean | null;
};

export function CardDropzone({ isValidDrop }: CardDropzone) {
  const styles = classNames('w-32 h-48 rounded-lg border-2 border-dashed', {
    'border-teal-300': isValidDrop,
    'border-gray-600': !isValidDrop,
  });

  return <div className={styles}></div>;
}

export default CardDropzone;
