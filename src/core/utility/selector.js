import Immutable from 'immutable';
import { createSelectorCreator, createStructuredSelector, defaultMemoize } from 'reselect';

/**
 * Create selector creator
 * @param  {...[type]} args: Please read more createSelectorCreator at https://www.npmjs.com/package/reselect
 * @return {[type]}
 */
export const createSelector = (...args) => {
  return createSelectorCreator(defaultMemoize, Immutable.is)(...args);
};

/**
 * Combine selector with structured selectors
 * @param  {Object} selectors [description]
 * @param  {Function} selectorCreator [description]
 * @return {Object} that combine all input selectors' value
 */
export const combineSelectors = (selectors, selectorCreator = createSelector) => {
  return createStructuredSelector(selectors, selectorCreator);
};