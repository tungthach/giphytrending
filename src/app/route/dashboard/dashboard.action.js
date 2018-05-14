import {
  ACTION_LOAD_GIPHY_TRENDING,
  ACTION_LOAD_GIPHY_TRENDING_SUCCESS,
  ACTION_LOAD_GIPHY_TRENDING_FAILURE
} from './dashboard.constant';

/**
 * Action to request the giphy trending images from the api
 *
 * @param {number} offset  Image offset
 * @return {Object}        Action object
 */
export const getGiphyTrending = offset => {
  return {
    type: ACTION_LOAD_GIPHY_TRENDING,
    payload: { offset }
  };
};

/**
 * Action to get images gotten from API
 *
 * @param  {Array}  images      The list of images
 * @param  {Object} pagination  The pagination
 * @param  {Object} offset      The list images offset
 * @return {Object}             Action object
 */
export const getGiphyTrendingSuccess = (images, pagination, offset) => {
  return {
    type: ACTION_LOAD_GIPHY_TRENDING_SUCCESS,
    payload: { images, pagination, offset }
  };
};

/**
 * Action to handle case request the Giphy images list failed
 *
 * @return {Object}        Action object
 */
export const getUsersFailure = () => {
  return {
    type: ACTION_LOAD_GIPHY_TRENDING_FAILURE
  };
};
