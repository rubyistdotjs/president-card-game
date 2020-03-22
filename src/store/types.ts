import { Game, User } from '../types';

import { AddCurrentUser } from './actions/current-user';
import { InitGame, AddTurn, AddMove } from './actions/game';

export type CurrentUserState = User | null;
export type CurrentUserAction = AddCurrentUser;

export type GameState = Game | null;
export type GameAction = InitGame | AddTurn | AddMove;

export type State = {
  game: GameState;
  currentUser: CurrentUserState;
};
export type Action = GameAction | CurrentUserAction;
