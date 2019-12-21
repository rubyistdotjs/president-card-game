import React from 'react';

type AvatarProps = {
  size: number;
};

function Avatar({ size }: AvatarProps) {
  const sizeClassNames = `w-${size} h-${size}`;
  return (
    <div className={`${sizeClassNames} rounded-lg bg-teal-800 mr-2`}></div>
  );
}

type PlayerProps = {
  username: String;
  remainingCards: number;
};

function Player({ username, remainingCards }: PlayerProps) {
  return (
    <div className="flex flex-row items-center w-full p-2 bg-gray-800 rounded-lg mb-2">
      <Avatar size={10} />
      <div>
        <span className="block text-white font-semibold leading-none">
          {username}
        </span>
        <span className="text-gray-600 text-sm leading-none">
          {remainingCards} cards
        </span>
      </div>
    </div>
  );
}

function Card() {
  return <div className="w-32 h-48 rounded-lg bg-gray-500"></div>;
}

function Dropzone() {
  return (
    <div className="w-32 h-48 rounded-lg border border-gray-500 border-dashed"></div>
  );
}

type StackProps = {
  cards: number;
};

function Stack({ cards }: StackProps) {
  return (
    <div className="flex flex-row">
      {new Array(cards).fill(null).map((_: null, index: number) => (
        <div key={`stacked-card-${index}`} className="mr-4">
          <Card />
        </div>
      ))}
    </div>
  );
}

type DropzoneStackProps = {
  cards: number;
};

function DropzoneStack({ cards }: StackProps) {
  return (
    <div className="flex flex-row">
      {new Array(cards).fill(null).map((_: null, index: number) => (
        <div key={`stacked-dropzone-${index}`} className="mr-4">
          <Dropzone />
        </div>
      ))}
    </div>
  );
}

function Board() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="mr-8">
          <Avatar size={10} />
        </div>
        <Stack cards={4} />
      </div>
      <div className="flex flex-row items-center mt-8">
        <div className="mr-8">
          <Avatar size={10} />
        </div>
        <DropzoneStack cards={4} />
      </div>
    </div>
  );
}

type HandProps = {
  cards: number;
};

function Hand({ cards }: HandProps) {
  return (
    <div className="flex flex-row -mb-10">
      {new Array(cards).fill(null).map((_: null, index: number) => (
        <div key={`hand-card-${index}`} className="-mr-8 shadow-lg">
          <Card />
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-900">
      <div className="flex flex-row w-full min-h-screen">
        <div className="w-9/12 h-full p-4">
          <Board />
          <Hand cards={12} />
        </div>
        <div className="w-3/12 h-full p-4">
          <Player username="Jon S." remainingCards={8} />
          <Player username="Arya S." remainingCards={12} />
        </div>
      </div>
    </div>
  );
}

export default App;
