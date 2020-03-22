import { CurrentUserState, CurrentUserAction } from '../types';
import { ADD_CURRENT_USER } from '../actions/current-user';

export function currentUserReducer(
  state: CurrentUserState = null,
  action: CurrentUserAction
): CurrentUserState {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return {
        id: action.payload.id,
        username: action.payload.username,
      };
    default:
      return state;
  }
}
