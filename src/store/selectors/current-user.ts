import { createSelector } from 'reselect';

import { User } from '../../types';
import { State } from '../types';
import { playersSelector } from './game';

export const currentUserSelector = (state: State): User | null =>
  state.currentUser;

export const currentUserIdSelector = createSelector(
  currentUserSelector,
  currentUser => currentUser && currentUser.id
);

export const currentUserPlayerSelector = createSelector(
  currentUserIdSelector,
  playersSelector,
  (currentUserId, players) => {
    if (currentUserId === null || players === null) return null;
    return players.find(({ id }) => id === currentUserId) || null;
  }
);

export const currentUserRemainingCardsSelector = createSelector(
  currentUserPlayerSelector,
  player => player && player.remainingCards
);
