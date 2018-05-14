const merge = require('webpack-merge');
const helper = require('config/helper');
const isTestDebug = helper.isTestDebug();
const singleRun = !isTestDebug;
let config = null;

if (isTestDebug) {
  config = {
    reporters: ['mocha'],
    mochaReporter: {
      colors: {
        success: 'cyan',
        info: 'green'
      },
      showDiff: true,
      divider: '/',
      /* Log errors/warnings only */
      output: 'minimal'
    },
    autoWatch: true
  };
}
else {
  config = {
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['text-summary', 'lcov', 'cobertura'],
      'report-config': {
        html: { subdir: 'lcov' },
        cobertura: { subdir: '.', file: 'report.xml' }
      }
    }
  };
}

module.exports = merge({
  singleRun,
  frameworks: ['mocha', 'chai-immutable', 'sinon-chai'],
  files: ['../../node_modules/babel-polyfill/dist/polyfill.js'],
  exclude: ['src/core/redux/**/*.js'],
  webpackServer: {
    noInfo: true
  },
  browsers: ['PhantomJS'],
  colors: true
}, config);
