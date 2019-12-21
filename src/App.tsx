import React, { useState } from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { DndProvider, useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import Avatar from './components/Avatar';
import Card from './components/Card';
import CardDropzone from './components/CardDropzone';
import Player from './components/Player';

type Card = {
  uuid: string;
  symbol: string;
  rank: string;
};

const mockStashedCards: Card[] = [
  { uuid: uuid(), symbol: 'SPADES', rank: '7' },
  { uuid: uuid(), symbol: 'HEARTS', rank: '7' },
  { uuid: uuid(), symbol: 'DIAMONDS', rank: '7' },
  { uuid: uuid(), symbol: 'CLUBS', rank: '7' },
];

const mockDropzoneCards: (Card | null)[] = [null, null, null, null];

const mockHandCards: Card[] = [
  { uuid: uuid(), symbol: 'SPADES', rank: 'QUEEN' },
  { uuid: uuid(), symbol: 'DIAMONDS', rank: 'JACK' },
  { uuid: uuid(), symbol: 'SPADES', rank: 'JACK' },
  { uuid: uuid(), symbol: 'DIAMONDS', rank: '9' },
  { uuid: uuid(), symbol: 'HEARTS', rank: '9' },
  { uuid: uuid(), symbol: 'SPADES', rank: '9' },
  { uuid: uuid(), symbol: 'CLUBS', rank: '9' },
  { uuid: uuid(), symbol: 'DIAMONDS', rank: '4' },
  { uuid: uuid(), symbol: 'HEARTS', rank: '2' },
];

type DropzoneProps = {
  onCardDrop: Function;
  index: number;
};

function Dropzone({ onCardDrop, index }: DropzoneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'HAND_CARD',
    drop: ({ uuid }: DragObjectWithType & Card) => {
      onCardDrop({ uuid, index });
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <CardDropzone active={isOver} />
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
            <DraggableCard type="DROPZONE_CARD" card={card} />
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
  type: string;
};

function DraggableCard({ type, card }: DraggableCardProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type, ...card },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dragClassNames = classNames('cursor-grab active:cursor-grab', {
    invisible: isDragging,
  });

  return (
    <div ref={drag} className={dragClassNames}>
      <Card symbol={card.symbol} rank={card.rank} />
    </div>
  );
}

type HandProps = {
  cards: Card[];
  onCardDrop: Function;
};

function Hand({ cards, onCardDrop }: HandProps) {
  const [, drop] = useDrop({
    accept: 'DROPZONE_CARD',
    drop: ({ uuid }: DragObjectWithType & Card) => {
      onCardDrop({ uuid });
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <div className="flex flex-row">
        {cards.map((card: Card, index: number) => (
          <div key={`hand-card-${index}`} className="-mr-8 shadow-lg">
            <DraggableCard type="HAND_CARD" card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [stashedCards, setStashedCards] = useState(mockStashedCards);
  const [dropzoneCards, setDropzoneCards] = useState(mockDropzoneCards);
  const [handCards, setHandCards] = useState(mockHandCards);

  const onMoveBackToHand = ({ uuid }: { uuid: string }) => {
    const dropzoneCardIndex = dropzoneCards.findIndex(
      c => c && c.uuid === uuid
    );

    if (dropzoneCardIndex < 0) return;

    const card = dropzoneCards[dropzoneCardIndex];
    if (card === null) return;

    setHandCards([...handCards, { ...card }]);
    setDropzoneCards([
      ...dropzoneCards.slice(0, dropzoneCardIndex),
      null,
      ...dropzoneCards.slice(dropzoneCardIndex + 1),
    ]);
  };

  const onCardDrop = ({ uuid, index }: { uuid: string; index: number }) => {
    const handCardIndex = handCards.findIndex(c => c.uuid === uuid);

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
                <Hand cards={handCards} onCardDrop={onMoveBackToHand} />
              </div>
            </div>
          </DndProvider>
        </div>
        <div className="w-3/12 h-full p-4">
          <Player username="Jon S." remainingCardsCount={8} />
          <Player username="Arya S." remainingCardsCount={12} />
        </div>
      </div>
      @
    </div>
  );
}

export default App;
