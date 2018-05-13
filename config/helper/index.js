const path = require('path');
const dirRoot = path.resolve(__dirname, '..', '..');

/**
* Convert path to url
* @param  {string} filePath       file path string
* @return {string}                file url
*/
const pathToUrl = (filePath) => {
  return (filePath || '').replace(/\\/g, '/');
};

/**
* Generate path start with root directory based on args
* @param  {array} args    path parts
* @return {string}        path string
*/
const root = (...args) => {
  return path.join(...[dirRoot].concat(args));
};

/**
 * Join path
 * @param  {array} args paths
 * @return {string}     joined path
 */
const join = (...args) => {
  console.log('path', path);
  console.log('args', args);

  return path.join(...args);
};

/**
* Generate url based on args
* @param  {array} args    url parts
* @return {string}        url string
*/
const url = (...args) => {
  return pathToUrl(args.join('/'));
};

/**
 * Check node environment
 * @param  {string} mode  Environment mode
 * @return {type}         True if is in right mode
 */
const checkNodeEnvironment = (mode) => {
  return (process.env.NODE_ENV || '').toLowerCase() === (mode || '').toLowerCase();
};

/**
 * Check node environment is PRODUCTION or not
 * @return {bool} true if PRODUCTION mode
 */
const isProd = () => {
  return checkNodeEnvironment('production');
};

/**
 * Check node environment is DEVELOPMENT or not
 * @return {bool} true if DEVELOPMENT mode
 */
const isDev = () => {
  return checkNodeEnvironment('development');
};

/**
 * Check node environment is TEST or not
 * @return {bool} true if TEST mode
 */
const isTest = () => {
  return checkNodeEnvironment('test');
};

/**
 * Check node environment is TEST_DEBUG or not
 * @return {bool} true if TEST_DEBUG mode
 */
const isTestDebug = () => {
  return checkNodeEnvironment('test-debug');
};

/**
 * Check node environment
 * @return {bool} true if is in right mode
 */

/**
* Export helper methods
*/
module.exports = {
  url,
  pathToUrl,
  root,
  join,
  isProd,
  isDev,
  isTest,
  isTestDebug
};