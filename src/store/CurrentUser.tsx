import React, { createContext } from 'react';

import { withUuid } from '../game/utils';
import { User } from '../game/types';

export const CurrentUserContext = createContext<User | null>(null);

export type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const currentUser: User = withUuid({ username: 'You' });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
