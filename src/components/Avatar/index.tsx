import React from 'react';
import classNames from 'classnames';

export type AvatarProps = {
  username: string;
  size: number;
};

export function Avatar({ username, size }: AvatarProps) {
  const images = require.context('./images', false, /\.jpg$/);
  const imageFilename = `${username.toLowerCase()}.jpg`;
  const image = images(`./${imageFilename}`);

  return (
    <div
      className={classNames(
        `w-${size}`,
        `h-${size}`,
        'rounded-lg bg-black overflow-hidden'
      )}
    >
      <img src={image} alt={username} className="block w-full" />
    </div>
  );
}

export default Avatar;
