import { combineReducers } from 'redux-immutable';

import { routerReducer } from './router.reducer';

/**
 * Create root reducer
 *
 * @param  {Object} reducers The reducers
 * @return {Object}
 */
export const createReducer = (reducers) => {
  return combineReducers({
    routing: routerReducer,
    ...reducers
  });
};

export * from './router.reducer';
