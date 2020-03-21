import { User } from '../../types';
import { ADD_CURRENT_USER, AddCurrentUser } from '../actions/current-user';

export type CurrentUserState = User | null;
export type CurrentUserTypes = AddCurrentUser;

export function currentUserReducer(
  state: CurrentUserState = null,
  action: CurrentUserTypes
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
