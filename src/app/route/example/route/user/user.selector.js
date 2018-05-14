import { createSelector } from 'utility/selector';

import { STATE_USER, STATE_USER_LIST } from './user.constant';

/**
 * Get users from state
 * @param  {Immutable.Map} state      User state
 * @return {Immutable.List}           User list
 */
const getUsers = state => state.getIn([STATE_USER, STATE_USER_LIST]);

/**
 * Export user selector
 * @param  {Object} options     info that passed as props
 * @return {Object }            User selector
 */
export const userSelector = createSelector(
  getUsers,
  (users) => {
    return {
      users
    };
  }
);