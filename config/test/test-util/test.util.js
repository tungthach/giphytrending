import _ from 'lodash';

import { INT_ZERO } from 'core';

/**
 * Waiting to run a function
 * @param  {Function} func [is function need to be run]
 * @return {Promise}       [return promise after function run]
 */
export const waiting = (func) => {
  if (!_.isFunction(func)) {
    return Promise.resolve(func);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(func());
      } catch (error) {
        reject(error);
      }
    }, INT_ZERO);
  });
};