import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { botMove } from '../../game/actions';
import { canPlayCard } from '../../utils/game';
import { Card as CardType } from '../../types';
import {
  lastMoveWithCardsSelector,
  activePlayerSelector,
} from '../../store/selectors/game';
import {
  currentUserRemainingCardsSelector,
  currentUserSelector,
} from '../../store/selectors/current-user';

import Board from './Board';
import Hand from './Hand';
import { addMove } from '../../store/actions/game';

function Game() {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);
  const currentUserCards = useSelector(currentUserRemainingCardsSelector);
  const activePlayer = useSelector(activePlayerSelector);
  const lastMoveWithCards = useSelector(lastMoveWithCardsSelector);

  const [dropzoneCards, setDropzoneCards] = useState<(CardType | null)[]>([]);

  useEffect(() => {
    if (lastMoveWithCards?.cards && lastMoveWithCards.cards.length > 0) {
      const newDropzoneCards = new Array(lastMoveWithCards.cards.length).fill(
        null
      );
      setDropzoneCards(newDropzoneCards);
    } else {
      setDropzoneCards([null]);
    }
  }, [lastMoveWithCards]);

  useEffect(() => {
    if (activePlayer && currentUser && activePlayer.id !== currentUser.id) {
      const move = botMove(lastMoveWithCards, false, activePlayer);
      setTimeout(() => {
        console.log(activePlayer.username);
        console.log(move);
        dispatch(addMove(activePlayer, move.action, move.cards));
      }, 800);
    }
  }, [activePlayer, currentUser, dispatch, lastMoveWithCards]);

  const onMoveBackToHand = ({ id }: { id: string }) => {
    if (dropzoneCards.length < 1) return null;

    const dropzoneCardIndex = dropzoneCards.findIndex(c => c && c.id === id);
    if (dropzoneCardIndex < 0) return null;

    const card = dropzoneCards[dropzoneCardIndex];
    if (card === null) return null;

    setDropzoneCards([
      ...dropzoneCards.slice(0, dropzoneCardIndex),
      null,
      ...dropzoneCards.slice(dropzoneCardIndex + 1),
    ]);
  };

  const canDropCard = (card: CardType) => {
    const playedCards = dropzoneCards.filter((c): c is CardType => c !== null);
    return canPlayCard(lastMoveWithCards?.cards || [], playedCards, card);
  };

  const onCardDrop = ({ id, index }: { id: string; index: number }) => {
    if (currentUserCards === null) return null;

    const cardIndex = currentUserCards.findIndex(c => c.id === id);
    if (cardIndex < 0) return null;

    setDropzoneCards([
      ...dropzoneCards.slice(0, index),
      { ...currentUserCards[cardIndex] },
      ...dropzoneCards.slice(index + 1),
    ]);
  };

  const dropzoneCardIds = dropzoneCards
    .filter((c): c is CardType => c !== null)
    .map(c => c.id);
  const currentUserHand = currentUserCards?.filter(
    c => !dropzoneCardIds.includes(c.id)
  );

  return (
    <DndProvider backend={Backend}>
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center h-full">
          <Board
            stashedCards={lastMoveWithCards?.cards || []}
            dropzoneCards={dropzoneCards}
            canDropCard={canDropCard}
            onCardDrop={onCardDrop}
          />
        </div>
        <div className="mt-10 -mb-16">
          {currentUserHand && (
            <Hand cards={currentUserHand} onCardDrop={onMoveBackToHand} />
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default Game;
