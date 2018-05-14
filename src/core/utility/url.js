import _ from 'lodash';
import queryString from 'query-string';

import { INT_ZERO, INT_ONE } from './constant';

/**
 * Check if the input value is stringifiable
 *
 * @param {any} value The input value
 * @return {Boolean} true, if the value is stringifiable; false, otherwise
 */
const isStringifiableValue = (value) => [_.isNull, _.isString, _.isNumber].some((checker) => checker(value));

/**
 * Check if the input value is falsy or empty object/array
 *
 * @param {any} value The input value
 * @return {Boolean} true, if the value is falsy or empty; false, otherwise
 */
const isFalsyOrEmpty = (value) => {
  return [
      _.isNil,
      (x) => !isStringifiableValue(x) && _.isEmpty(x)
    ]
    .some((checker) => checker(value));
};

/**
 * Check if the input object is stringifiable
 *
 * @param {Object} object Input value
 * @return {Boolean} true, if the object is stringifiable; false, otherwise
 */
const isStringifiableObject = (object) => {
  return _.isPlainObject(object)
    && Object.keys(object).every((key) => {
      const value = object[key];

      return isStringifiableValue(value) || (_.isArray(value) && value.every(isStringifiableValue));
  });
};

/**
 * The helper class for parsing/stringifying URL queries
 *
 * @export
 * @class UrlUtil
 */
export class UrlUtil {
  /**
   * Stringify a object to a string in URL query format
   *
   * @static
   * @param {Object} object The input object
   * @return {String} The stringified queries
   */
  static stringify(object) {
    // Check object's depth
    const isValid = isStringifiableObject(object);

    if (!isValid) throw Error("The object must be at most one level depth and contains only string and number");

    const sanitizedObject = _
      .chain(object)
      // Remove empty property
      .pickBy((value) => !isFalsyOrEmpty(value))
      // Sanitize object's arrays
      .mapValues((value) => {
        if (isStringifiableValue(value)) {
          return encodeURIComponent(value);
        }

        return value.map(encodeURIComponent).join(',');
      })
      .value();

    return queryString.stringify(sanitizedObject);
  }

  /**
   * Parse a string in URL query format to a object
   *
   * @static
   * @param {String} queries The URL queries string
   * @return {Object} The parsed object
   */
  static parse(queries) {
    const parsedObject = queryString.parse(queries);

    // Desanitize object's arrays to normal
    const desanitizedObject = _.mapValues(parsedObject, (value) => {
      const desanitized = value.split(',').map(decodeURIComponent);

      return desanitized.length > INT_ONE ? desanitized : desanitized[INT_ZERO];
    });

    return desanitizedObject;
  }
}
