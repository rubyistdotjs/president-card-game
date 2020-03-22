import { combineReducers } from 'redux';

import { gameReducer } from './game';
import { currentUserReducer } from './current-user';

export default combineReducers({
  game: gameReducer,
  currentUser: currentUserReducer,
});
