import Immutable from 'immutable';

import { IMMUTABLE_EMPTY_LIST } from 'core';

import { ACTION_GET_USERS_SUCCESS, STATE_USER_LIST } from './user.constant';

/*
 * Initial state
 */
const initialState = Immutable.fromJS({
  [STATE_USER_LIST]: IMMUTABLE_EMPTY_LIST
});

/**
 * Handle get users
 *
 * @param {object} state    The counter state
 * @param {object} payload  The payload to update
 * @return {object}         The new counterstate
 */
export const handleGetUsers = (state, payload) => {
  return state.setIn([STATE_USER_LIST], Immutable.fromJS(payload));
};

/**
 * Counter reducer
 *
 * @param  {object} state  Current state
 * @param  {object} action Redux action
 * @return {object}        New state
 */
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Handle get users list success
    case ACTION_GET_USERS_SUCCESS:
      return handleGetUsers(state, payload);

    // Default case to keep current state
    default:
      return state;
  }
};
