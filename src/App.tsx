import React from 'react';
import classNames from 'classnames';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

type Card = {
  symbol: string;
  rank: string;
};

const stashedCards: Card[] = [
  { symbol: 'SPADES', rank: '7' },
  { symbol: 'HEARTS', rank: '7' },
  { symbol: 'DIAMONDS', rank: '7' },
  { symbol: 'CLUBS', rank: '7' },
];

const handCards: Card[] = [
  { symbol: 'SPADES', rank: 'QUEEN' },
  { symbol: 'DIAMONDS', rank: 'JACK' },
  { symbol: 'SPADES', rank: 'JACK' },
  { symbol: 'DIAMONDS', rank: '9' },
  { symbol: 'HEARTS', rank: '9' },
  { symbol: 'SPADES', rank: '9' },
  { symbol: 'CLUBS', rank: '9' },
  { symbol: 'DIAMONDS', rank: '4' },
  { symbol: 'HEARTS', rank: '2' },
];

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

function Card({ symbol, rank }: Card) {
  return (
    <div className="flex items-center justify-center w-32 h-48 rounded-lg bg-gray-500">
      <span className="text-gray-900 text-xs font-bold">
        {rank} of {symbol}
      </span>
    </div>
  );
}

function Dropzone() {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'CARD',
    drop: () => console.log('drop'),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  console.log(isOver);
  console.log(canDrop);
  return (
    <div
      className="w-32 h-48 rounded-lg border border-gray-500 border-dashed"
      ref={drop}
    ></div>
  );
}

type StackProps = {
  cards: Card[];
};

function Stack({ cards }: StackProps) {
  return (
    <div className="flex flex-row">
      {cards.map((card: Card, index: number) => (
        <div key={`stacked-card-${index}`} className="mr-4">
          <Card symbol={card.symbol} rank={card.rank} />
        </div>
      ))}
    </div>
  );
}

type DropzoneStackProps = {
  cards: number;
};

function DropzoneStack({ cards }: DropzoneStackProps) {
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
      <DndProvider backend={Backend}>
        <div className="flex flex-row items-center">
          <div className="mr-8">
            <Avatar size={10} />
          </div>
          <Stack cards={stashedCards} />
        </div>
      </DndProvider>
      <div className="flex flex-row items-center mt-8">
        <div className="mr-8">
          <Avatar size={10} />
        </div>
        <DropzoneStack cards={4} />
      </div>
    </div>
  );
}

type DraggableCardProps = {
  card: Card;
};

function DraggableCard({ card }: DraggableCardProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'CARD', ...card },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dragClassNames = classNames({
    'opacity-50': isDragging,
  });

  return (
    <div ref={drag} className={dragClassNames}>
      <Card symbol={card.symbol} rank={card.rank} />
    </div>
  );
}

type HandProps = {
  cards: Card[];
};

function Hand({ cards }: HandProps) {
  return (
    <div className="flex flex-row -mb-10">
      {cards.map((card: Card, index: number) => (
        <div key={`hand-card-${index}`} className="-mr-8 shadow-lg">
          <DraggableCard card={card} />
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
          <DndProvider backend={Backend}>
            <Board />
            <Hand cards={handCards} />
          </DndProvider>
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
