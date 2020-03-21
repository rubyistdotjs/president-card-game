import uuid from 'uuid/v4';

export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';

export type AddCurrentUser = {
  type: typeof ADD_CURRENT_USER;
  payload: {
    id: string;
    username: string;
  };
};

export function addCurrentUser(username: string): AddCurrentUser {
  return {
    type: ADD_CURRENT_USER,
    payload: {
      id: uuid(),
      username,
    },
  };
}
