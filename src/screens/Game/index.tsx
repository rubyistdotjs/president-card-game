import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { buildBots, buildPlayers } from '../../game/builders';
import { initGame } from '../../store/actions/game';
import { addCurrentUser } from '../../store/actions/current-user';
import { gameSelector } from '../../store/selectors/game';
import { currentUserSelector } from '../../store/selectors/current-user';

import Game from './Game';
import PlayerList from './PlayerList';

function GameScreen() {
  const dispatch = useDispatch();

  const game = useSelector(gameSelector);
  const user = useSelector(currentUserSelector);

  useEffect(() => {
    if (user === null) dispatch(addCurrentUser('Me'));
  }, [dispatch, user]);

  useEffect(() => {
    if (game === null && user !== null) {
      const bots = buildBots([
        'Arya',
        'Sansa',
        'Jon',
        'Brandon',
        'Rickon',
        'Robb',
      ]);

      const players = buildPlayers([...bots, user]);
      dispatch(initGame(players));
    }
  }, [dispatch, game, user]);

  if (user === null || game === null) return null;

  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="w-9/12 min-h-full pt-4 pr-4 pl-4 overflow-hidden">
        <Game />
      </div>
      <div className="w-3/12 min-h-full p-2">
        <PlayerList />
      </div>
    </div>
  );
}

export default GameScreen;
