import _ from 'lodash';

/**
* Function sequence, run all functions from left to right with the same data
* @param  {[Function]} funcs is array of functions
* @return {Void}
*/
export const sequence = (...funcs) => (...args) => {
  _.each(funcs, (func) => func && func(...args));
};
