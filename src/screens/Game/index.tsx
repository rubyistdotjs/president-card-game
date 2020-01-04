import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { CurrentUserContext } from '../../store/CurrentUser';
import { GameContext } from '../../store/Game';

import { canPlayCard } from '../../utils/game';
import { Card as CardType } from '../../game/types';

import Board from './Board';
import Hand from './Hand';
import Player from '../../components/Player';

function Game() {
  const [stashedCards, setStashedCards] = useState<CardType[]>([]);
  const [dropzoneCards, setDropzoneCards] = useState<(CardType | null)[]>([]);
  const [handCards, setHandCards] = useState<CardType[]>([]);

  const user = useContext(CurrentUserContext);
  const game = useContext(GameContext);

  useEffect(() => {
    if (user && game) {
      const { players } = game;
      const currentPlayer = players.find(({ uuid }) => uuid === user.uuid);

      if (currentPlayer) {
        setHandCards(currentPlayer.cards);
      }
    }
  }, [game, user]);

  useEffect(() => {
    if (stashedCards.length > 0) {
      const newDropzoneCards = new Array(stashedCards.length).fill(null);
      setDropzoneCards(newDropzoneCards);
    } else {
      setDropzoneCards([null]);
    }
  }, [stashedCards.length]);

  if (user === null || game === null) return null;

  const onMoveBackToHand = ({ uuid }: { uuid: string }) => {
    if (dropzoneCards.length < 1) return;

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

  const canDropCard = (card: CardType) => {
    const playedCards: CardType[] = dropzoneCards.filter(
      (c: CardType | null): c is CardType => c !== null
    );
    return canPlayCard(stashedCards, playedCards, card);
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
    <div className="flex flex-row w-full min-h-screen">
      <div className="w-9/12 min-h-full pt-4 pr-4 pl-4 overflow-hidden">
        <DndProvider backend={Backend}>
          <div className="flex flex-col items-center h-full">
            <div className="flex items-center h-full">
              <Board
                stashedCards={stashedCards}
                dropzoneCards={dropzoneCards}
                canDropCard={canDropCard}
                onCardDrop={onCardDrop}
              />
            </div>
            <div className="mt-10 -mb-16">
              <Hand cards={handCards} onCardDrop={onMoveBackToHand} />
            </div>
          </div>
        </DndProvider>
      </div>
      <div className="w-3/12 min-h-full p-2">
        {game.players.map(player => (
          <Player
            key={player.uuid}
            username={player.username}
            remainingCardsCount={player.cards.length}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
