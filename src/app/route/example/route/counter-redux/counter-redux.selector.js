import { combineSelectors } from 'utility/selector';

import { STATE_COUNTER_REDUX, STATE_COUNTER_REDUX_VALUE } from './counter-redux.constant';

/**
 * Get Counter Redux state
 * @param  {Immutable.Map} state      Counter Redux state
 * @return {Immutable.Map}            Counter value
 */
const counter = state => state.getIn([STATE_COUNTER_REDUX, STATE_COUNTER_REDUX_VALUE]);

/**
 * Export counter selector
 * @param  {Object} options     info that passed as props
 * @return {Object }            Counter Redux selector
 */
export const counterReduxSelector = combineSelectors({ counter });
