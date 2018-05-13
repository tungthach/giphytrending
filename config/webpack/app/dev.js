const merge = require('webpack-merge');

const devConfig = require('config/webpack/base/dev');
const baseConfig = require('./base');

const { webpackHotMiddleWare, sourceFolderName, ports } = baseConfig.settings;

module.exports = merge(baseConfig, {
  webpack: {
    // https://github.com/webpack/docs/wiki/configuration#devtool
    devtool: 'source-map',
    entry: {
      webpack: [webpackHotMiddleWare]
    },
    module: {
      rules: [
        /* CSS */
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },

        /* SCSS */
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            ...baseConfig.settings.commonLoaders
          ],
          include: new RegExp(`core|${sourceFolderName}`)
        }
      ]
    },
    plugins: devConfig.plugins(ports.app)
  }
});
