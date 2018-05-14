import { fromJS } from 'immutable';

import { IMMUTABLE_EMPTY_LIST, INT_ZERO } from 'core';

import {
  ACTION_LOAD_GIPHY_TRENDING,
  ACTION_LOAD_GIPHY_TRENDING_SUCCESS,
  STATE_GIPHY_LIST,
  STATE_DASHBOARD_LOADING,
  STATE_GIPHY_PAGINATION
} from './dashboard.constant';

/*
 * Initial state
 */
const initialState = fromJS({
  [STATE_GIPHY_LIST]: IMMUTABLE_EMPTY_LIST,
  [STATE_DASHBOARD_LOADING]: false,
  [STATE_GIPHY_PAGINATION]: {}
});

/**
 * Handle get giphy trending images
 *
 * @param {object} state    The dashboard state
 * @return {object}         The new dashboard state
 */
export const handleGetImages = (state) => {
  return state.setIn([STATE_DASHBOARD_LOADING], true);
};

/**
 * Handle get giphy trending images successfully
 *
 * @param {object} state    The dashboard state
 * @param {object} payload  The payload to update
 * @return {object}         The new dashboard state
 */
export const handleGetImagesSuccess = (state, payload) => {
  const { images, offset, pagination } = payload;
  const newList =
    offset > INT_ZERO ? state.getIn([STATE_GIPHY_LIST]).concat(fromJS(images)) : fromJS(images);

  return state.setIn([STATE_GIPHY_LIST], newList)
              .setIn([STATE_DASHBOARD_LOADING], false)
              .setIn([STATE_GIPHY_PAGINATION], fromJS(pagination));
};

/**
 * Dashboard reducer
 *
 * @param  {object} state  Current state
 * @param  {object} action Redux action
 * @return {object}        New state
 */
export const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Handle get users list success
    case ACTION_LOAD_GIPHY_TRENDING:
      return handleGetImages(state);
    // Handle get users list success
    case ACTION_LOAD_GIPHY_TRENDING_SUCCESS:
      return handleGetImagesSuccess(state, payload);

    // Default case to keep current state
    default:
      return state;
  }
};
