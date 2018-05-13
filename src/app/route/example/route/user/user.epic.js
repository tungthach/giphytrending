import { combineEpics } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

import { getUsersSuccess } from './user.action';
import { ACTION_GET_USERS_REQUEST, URL_API_USERS } from './user.constant';

/**
 * Get the list of users from API epic
 *
 * @param  {Observable} actionStream  The action stream
 * @param  {Object} store             The redux store
 * @param  {Object} dependencies      The dependencies
 * @return {Observable}               The output action stream
 */
export const getUsersEpic = (actionStream, store, { getJSON }) => {
  return actionStream
    .ofType(ACTION_GET_USERS_REQUEST)
    .pipe(
      mergeMap(() => {
        return getJSON(URL_API_USERS)
          .pipe(
            map(response => getUsersSuccess(response))
          );
        }
      )
    );
};

/**
 * The epic of the Landing component
 */
export const userEpic = combineEpics(
  getUsersEpic
);
