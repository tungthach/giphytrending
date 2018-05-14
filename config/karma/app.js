const merge = require('webpack-merge');
const path = require('path');

const appWebpackTestConfig = require('config/webpack/app/test');
const baseKarmaConfig = require('./base');
const varialbes = require('config/variable');

const appReportPath = path.join(varialbes.paths.report, 'coverage', 'app');
const appTestsPath = path.join(varialbes.paths.config, 'test', 'app.js');

/**
 * Get Karma config for project App
 * @param  {Object} config [Default Karma config]
 * @return {Object}        [App Karma config]
 */
module.exports = config => {
  const appKarmaConfig = merge(baseKarmaConfig, {
    webpack: appWebpackTestConfig,
    files: [appTestsPath],
    preprocessors: {
      [appTestsPath]: ['webpack', 'sourcemap']
    },
    coverageIstanbulReporter: {
      dir: appReportPath
    },
    port: varialbes.ports.appTest,
    logLevel: config.LOG_INFO
  });

  config.set(appKarmaConfig);
};