import React, { useState } from 'react';
import classNames from 'classnames';
import { DndProvider, useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import Avatar from './components/Avatar';
import Card from './components/Card';
import CardDropzone from './components/CardDropzone';

type Card = {
  symbol: string;
  rank: string;
};

const mockStashedCards: Card[] = [
  { symbol: 'SPADES', rank: '7' },
  { symbol: 'HEARTS', rank: '7' },
  { symbol: 'DIAMONDS', rank: '7' },
  { symbol: 'CLUBS', rank: '7' },
];

const mockDropzoneCards: (Card | null)[] = [null, null, null, null];

const mockHandCards: Card[] = [
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

type PlayerProps = {
  username: String;
  remainingCards: number;
};

function Player({ username, remainingCards }: PlayerProps) {
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
          {remainingCards} cards
        </span>
      </div>
    </div>
  );
}

type DropzoneProps = {
  onCardDrop: Function;
  index: number;
};

function Dropzone({ onCardDrop, index }: DropzoneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: ({ symbol, rank }: DragObjectWithType & Card) => {
      onCardDrop({ symbol, rank, index });
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <CardDropzone isValidDrop={isOver} />
    </div>
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
  cards: (Card | null)[];
  onCardDrop: Function;
};

function DropzoneStack({ cards, onCardDrop }: DropzoneStackProps) {
  return (
    <div className="flex flex-row">
      {cards.map((card: Card | null, index: number) => (
        <div key={`stacked-dropzone-${index}`} className="mr-4">
          {card === null ? (
            <Dropzone onCardDrop={onCardDrop} index={index} />
          ) : (
            <Card symbol={card.symbol} rank={card.rank} />
          )}
        </div>
      ))}
    </div>
  );
}

type BoardProps = {
  stashedCards: Card[];
  dropzoneCards: (Card | null)[];
  onCardDrop: Function;
};

function Board({ stashedCards, dropzoneCards, onCardDrop }: BoardProps) {
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
        <DropzoneStack cards={dropzoneCards} onCardDrop={onCardDrop} />
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

  const dragClassNames = classNames('cursor-grab active:cursor-grab', {
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
    <div className="flex flex-row">
      {cards.map((card: Card, index: number) => (
        <div key={`hand-card-${index}`} className="-mr-8 shadow-lg">
          <DraggableCard card={card} />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [stashedCards, setStashedCards] = useState(mockStashedCards);
  const [dropzoneCards, setDropzoneCards] = useState(mockDropzoneCards);
  const [handCards, setHandCards] = useState(mockHandCards);

  const onCardDrop = ({
    symbol,
    rank,
    index,
  }: {
    symbol: string;
    rank: string;
    index: number;
  }) => {
    const handCardIndex = handCards.findIndex(
      card => card.symbol === symbol && card.rank === rank
    );

    setDropzoneCards([
      ...dropzoneCards.slice(0, index),
      { ...handCards[handCardIndex] },
      ...dropzoneCards.slice(index + 1),
    ]);

    setHandCards([
      ...handCards.slice(0, handCardIndex),
      ...handCards.slice(handCardIndex + 1),
    ]);
  };

  return (
    <div className="bg-gray-900">
      <div className="flex flex-row w-full min-h-screen">
        <div className="w-9/12 min-h-full pt-4 pr-4 pl-4 overflow-hidden">
          <DndProvider backend={Backend}>
            <div className="flex flex-col items-center h-full">
              <div className="flex items-center h-full">
                <Board
                  stashedCards={stashedCards}
                  dropzoneCards={dropzoneCards}
                  onCardDrop={onCardDrop}
                />
              </div>
              <div className="mt-10 -mb-12">
                <Hand cards={handCards} />
              </div>
            </div>
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
