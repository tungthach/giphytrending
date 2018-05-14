import { combineSelectors } from 'utility/selector';

/**
 * Get auth state
 * @param  {Immutable.Map} state      Redux state
 * @return {Immutable.Map}            auth state
 */
const auth = state => state.get('auth');

/**
 * Export authorize selector
 * @param  {Object} options     info that passed as props
 * @return {Object }            Authorized selector
 */
export const authorizeSelector = combineSelectors({ auth });
