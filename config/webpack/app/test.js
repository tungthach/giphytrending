const merge = require('webpack-merge');
const baseConfig = require('./base');
const { paths, sourceFolderName } = baseConfig.settings;
const testConfig = require('config/webpack/base/test')(sourceFolderName);

module.exports = merge(testConfig, {
  resolve: {
    modules: [paths.app]
  }
});