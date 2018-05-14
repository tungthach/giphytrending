import { combineSelectors } from 'core';

import {
  STATE_DASHBOARD,
  STATE_GIPHY_LIST,
  STATE_GIPHY_PAGINATION,
  STATE_DASHBOARD_LOADING
} from './dashboard.constant';

/**
 * Get images from state
 * @param  {Immutable.Map} state      Dashboard state
 * @return {Immutable.List}           Images list
 */
export const images = state => state.getIn([STATE_DASHBOARD, STATE_GIPHY_LIST]).toJS();

/**
 * Is loading to get images
 *
 * @param {Immutable} state Dashboard state
 * @returns {Boolean}       True/False of loading state
 */
export const loading = state => state.getIn([STATE_DASHBOARD, STATE_DASHBOARD_LOADING]);

/**
 * Get the images pagination
 *
 * @param {Immutable} state Dashboard state
 * @returns {Boolean}       True/False of loading state
 */
export const pagination = state => state.getIn([STATE_DASHBOARD, STATE_GIPHY_PAGINATION]).toJS();

/**
 * Export dashboard selector
 * @param  {Object} options     info that passed as props
 * @return {Object }            User selector
 */
export const dashboardSelector = combineSelectors({ images, loading, pagination });
