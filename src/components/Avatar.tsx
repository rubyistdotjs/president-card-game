import React from 'react';
import classNames from 'classnames';

export type AvatarProps = {
  size: number;
};

export function Avatar({ size }: AvatarProps) {
  return (
    <div
      className={classNames(`w-${size}`, `h-${size}`, 'rounded-lg bg-black')}
    ></div>
  );
}

export default Avatar;
