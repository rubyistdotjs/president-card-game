import React from 'react';

import { CurrentUserProvider } from './store/CurrentUser';
import { GameProvider } from './store/Game';

import Game from './screens/Game';

function App() {
  return (
    <div>
      <CurrentUserProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
