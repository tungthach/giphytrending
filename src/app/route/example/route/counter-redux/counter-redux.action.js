import { ACTION_INCREASE, ACTION_DECREASE } from './counter-redux.constant';

/**
 * Increase counter
 *
 * @return {Object}   The action to increase counter
 */
export const increase = () => {
  return {
    type: ACTION_INCREASE
  };
};

/**
 * Decrease counter
 *
 * @return {Object}   The action to decrease counter
 */
export const decrease = () => {
  return {
    type: ACTION_DECREASE
  };
};
