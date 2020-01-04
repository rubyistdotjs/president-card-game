import React, { createContext, useContext } from 'react';

import { CurrentUserContext } from './CurrentUser';
import { Game } from '../game/types';
import { buildBots, buildGame } from '../game/builders';

export const GameContext = createContext<Game | null>(null);

export type GameProviderProps = {
  children: React.ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const currentUser = useContext(CurrentUserContext);

  if (currentUser === null) {
    throw new Error('GameProvider must be used within a CurrentUserProvider');
  }

  const bots = buildBots(['Arya', 'Sansa', 'Jon', 'Brandon', 'Rickon', 'Robb']);
  const game = buildGame([...bots, currentUser]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
