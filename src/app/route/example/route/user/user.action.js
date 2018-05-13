import {
  ACTION_GET_USERS_REQUEST,
  ACTION_GET_USERS_SUCCESS,
  ACTION_GET_USERS_FAILURE
} from './user.constant';

/**
 * Action to request the users list from the api
 *
 * @return {Object}        Action object
 */
export const getUsers = () => {
  return {
    type: ACTION_GET_USERS_REQUEST
  };
};

/**
 * Action to get users gotten from API
 *
 * @param  {Object} users  The list of users
 * @return {Object}        Action object
 */
export const getUsersSuccess = (users) => {
  return {
    type: ACTION_GET_USERS_SUCCESS,
    payload: users
  };
};

/**
 * Action to handle case request the users list failed
 *
 * @return {Object}        Action object
 */
export const getUsersFailure = () => {
  return {
    type: ACTION_GET_USERS_FAILURE
  };
};