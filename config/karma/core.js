const merge = require('webpack-merge');
const path = require('path');

const coreWebpackTestConfig = require('config/webpack/core/test');
const baseKarmaConfig = require('./base');
const varialbes = require('config/variable');

const coreReportPath = path.join(varialbes.paths.report, 'coverage', 'core');
const coreTestsPath = path.join(varialbes.paths.config, 'test', 'core.js');

/**
 * Get Karma config for project App
 * @param  {Object} config [Default Karma config]
 * @return {Object}        [App Karma config]
 */
module.exports = config => {
  const coreKarmaConfig = merge(baseKarmaConfig, {
    webpack: coreWebpackTestConfig,
    files: [
      coreTestsPath
    ],
    preprocessors: {
      [coreTestsPath]: ['webpack', 'sourcemap']
    },
    coverageIstanbulReporter: {
      dir: coreReportPath
    },
    port: varialbes.ports.coreTest,
    logLevel: config.LOG_INFO
  });

  config.set(coreKarmaConfig);
};