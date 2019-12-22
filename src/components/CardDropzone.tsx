import React from 'react';
import classNames from 'classnames';

export type CardDropzone = {
  active?: boolean;
};

export function CardDropzone({ active }: CardDropzone) {
  const styles = classNames('w-32 h-48 rounded border border-dashed', {
    'border-blue-300': active,
    'border-gray-600': !active,
  });

  return <div className={styles}></div>;
}

export default CardDropzone;
