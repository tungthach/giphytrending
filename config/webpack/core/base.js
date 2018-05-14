const merge = require('webpack-merge');

const baseConfig = require('config/webpack/base/base');

const { paths, urls, hosts, ports } = baseConfig.settings;

module.exports = merge(baseConfig, {
  settings: merge(baseConfig.settings, {
    host: hosts.core,
    port: ports.core,
    sourceFolderName: 'core'
  }),
  webpack: {
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
          include: /(core)/,
          exclude: /(node_modules)/
        },

        /* images */
        {
          test: /\.(jpg|jpeg|gif|png|ico)$/,
          loader: `url-loader?limit=12288&name=${urls.image}/[name]-[hash].[ext]`,
          include: /core/
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
        paths.core
      ]
    },
    plugins: []
  }
});
