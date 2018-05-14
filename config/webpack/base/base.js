const webpack = require('webpack');
const path = require('path');
const variables = require('config/variable');
const { paths, urls, hosts, ports } = variables;

module.exports = {
  settings: {
    paths,
    urls,
    hosts,
    ports,
    commonLoaders: [
      {
        loader: 'autoprefixer-loader?{browsers:["last 2 versions", "ie 6-8", "Firefox > 20"]}'
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [paths.coreAsset]
        }
      }
    ],
    webpackHotMiddleWare: 'webpack-hot-middleware/client?reload=true',
    host: hosts.default,
    port: ports.default
  },
  webpack: {
    /* Preload vendor to remove hot-update.js file auto generated in folder core */
    entry: {
      vendor: path.join(paths.config, 'preload', 'vendor.js')
    },
    resolve: {
      modules: [
        paths.source,
        paths.core,
        'node_modules'
      ],
      extensions: ['.js', '.scss']
    },
    plugins: [
      /* Workaround for jsondiffpatch */
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /jsondiffpatch/
      ),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'API_URL': JSON.stringify(process.env.API_URL),
        'GIPHY_API_KEY': JSON.stringify('mPxJIyYTDLz3rXf8Y8nDIEYr1YuAKRky')
      })
    ]
  }
};