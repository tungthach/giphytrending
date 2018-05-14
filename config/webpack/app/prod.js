const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');

const variables = require('config/variable');

const prodConfig = require('../base/prod');
const baseConfig = require('./base');

const { sourceFolderName, paths } = baseConfig.settings;
const extractPlugins = prodConfig.extractPlugins();

module.exports = merge(baseConfig, {
  webpack: {
    // Turn on devtool if you want to debug on production
    // devtool: 'cheap-module-eval-source-map',
    stats: prodConfig.stats,

    output: {
      // Production uses CDN-based output path
      publicPath: variables.distPublicPaths.app
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          loader: extractPlugins.lib.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
          exclude: paths.client
        },
        {
          test: /\.scss$/,
          loader: extractPlugins.app.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  root: variables.distPublicPaths.app
                }
              },
              ...baseConfig.settings.commonLoaders
            ]
          }),
          include: new RegExp(`core|${sourceFolderName}`)
        }
      ]
    },

    plugins: [
      // Clean build folder
      new CleanPlugin([paths.distApp], {
        root: paths.root
      }),

      // Output extracted CSS to files
      extractPlugins.lib,
      extractPlugins.app,

      // plugins
      ...prodConfig.plugins(paths.distAppFont)
    ]
  }
});
