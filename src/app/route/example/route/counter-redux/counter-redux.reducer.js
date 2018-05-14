import Immutable from 'immutable';

import { INT_ZERO, INT_ONE } from 'core';

import {
  ACTION_INCREASE,
  ACTION_DECREASE,
  STATE_COUNTER_REDUX_VALUE
} from './counter-redux.constant';

const initialState = Immutable.fromJS({
  [STATE_COUNTER_REDUX_VALUE]: INT_ZERO
});

/**
 * Handle increase counter
 * @param {object} state The counter state
 * @return {object}      The new counterstate
 */
export const handleIncrease = (state) => {
  const counter = state.getIn([STATE_COUNTER_REDUX_VALUE]) || INT_ZERO;

  return state.setIn([STATE_COUNTER_REDUX_VALUE], counter + INT_ONE);
};

/**
 * Handle decrease counter
 * @param  {object} state The counter state
 * @return {object}      The new counterstate
 */
export const handleDecrease = (state) => {
  const counter = state.getIn([STATE_COUNTER_REDUX_VALUE]) || INT_ZERO;

  return state.setIn([STATE_COUNTER_REDUX_VALUE], counter - INT_ONE);
};

/**
 * Counter reducer
 *
 * @param  {object} state  Current state
 * @param  {object} action Redux action
 * @return {object}        New state
 */
export const counterReduxReducer = (state = initialState, { type }) => {
  switch (type) {
    // Handle increase counter
    case ACTION_INCREASE:
      return handleIncrease(state);

    // Handle decrease counter
    case ACTION_DECREASE:
      return handleDecrease(state);

    // Default case to keep current state
    default:
      return state;
  }
};
