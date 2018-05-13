import _ from 'lodash';

/**
 * Convert a string to an array wrapped in lodash wrapper
 *
 * @param {String} inputString The input string
 * @return {Object} Lodash wrapper instance of the output array
 */
export const stringToArray = (inputString) => {
  return _
    .chain(inputString)
    .split(' ')
    .map(_.trim)
    .filter();
};