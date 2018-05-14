const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('../base/base');

const { paths, urls, hosts, ports } = baseConfig.settings;

module.exports = merge(baseConfig, {
  settings: merge(baseConfig.settings, {
    host: hosts.app,
    port: ports.app,
    sourceFolderName: 'app'
  }),
  webpack: {
    // NOTICE: Should add webpackHotMiddleWare for each entry point
    // or split to separately entry point to apply hot reload
    // Otherwise, HMR just logs in console but not trigger full page reload when files changed
    // https://github.com/glenjamin/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack
    entry: {
      core: [paths.core],
      app: [paths.app]
    },
    output: {
      path: paths.distApp,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        /* js files */
        {
          test: /\.js?$/,
          loader: 'babel-loader?cacheDirectory',
          include: /(app|core)/,
          exclude: /(node_modules)/
        },

        /* images */
        {
          test: /\.(jpg|jpeg|gif|png|ico)$/,
          loader: `url-loader?limit=12288&name=${urls.image}/[name]-[hash].[ext]`,
          include: /app|core/
        },

        /* fonts */
        {
          test: /\.(woff|woff2|eot|ttf|svg).*$/,
          loader: `url-loader?name=${urls.font}/[name].[ext]`
        }
      ]
    },
    resolve: {
      modules: [
        paths.app
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appViewTemplate,
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        },
        favicon: 'src/core/asset/image/favicon.png'
      })
    ]
  }
});
