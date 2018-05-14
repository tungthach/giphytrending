const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');

const { paths, commonLoaders } = baseConfig.settings;

/**
 * Get base Test config
 * @param  {String} sourceFolderName [Source Folder: app/<other project name>]
 * @return {Object}                  [Object configuration]
 */
module.exports = sourceFolderName => {
  const environment = process.env.NODE_ENV;
  const postLoaders = [];
  const lifecycleEvent = process.env.npm_lifecycle_event || '';

  /* Run test coverage only for CI, not in watch mode */
  if (environment === 'test') {
    postLoaders.push({
      test: /\.js$/,
      loader: 'istanbul-instrumenter-loader',
      include: new RegExp(`src.(${sourceFolderName})`),
      exclude: [
        // Exclude unit test files
        /(spec|index)\.js$/,
        // Exclude test, index and core/redux files
        new RegExp(`src.*.redux`),
        // Exclude app.component due to issue wrong coverage
        new RegExp(`src.*.route.app.app.component.js`)
      ],
      enforce: 'post',
      options: {
        esModules: true,
        produceSourceMap: true
      }
    });
  }

  return {
    // just do inline source maps instead of the default
    devtool: 'inline-source-map',
    resolve: {
      modules: [
        paths.source,
        paths.core,
        paths.config,
        path.join(paths.config, 'test'),
        'node_modules'
      ],
      extensions: ['.js', '.scss']
    },
    module: {
      rules: [
        ...postLoaders, {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: /node_modules/
        },

        /* json */
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },

        /* scss */
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', ...commonLoaders],
          include: new RegExp(`core|${sourceFolderName}`)
        },

        // images
        {
          test: /\.(jpg|jpeg|gif|png|ico)$/,
          loader: 'url-loader?limit=12288&name=asset/image/[name].[ext]'
        },

        // fonts
        {
          test: /\.(woff|svg).*$/,
          loader: 'url-loader?name=asset/font/[name].[ext]'
        }
      ]
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    plugins: [
      /* Workaround for jsondiffpatch */
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /jsondiffpatch/
      ),
      new webpack.DefinePlugin({
        'API_URL': JSON.stringify(process.env.API_URL),
        'process.env.NODE_ENV': JSON.stringify('test'),
        __DEVELOPMENT__: false,
        /* DISABLE redux-devtools HERE */
        __DEVTOOLS__: false,
        __LIFECYCLE_EVENT__: JSON.stringify(lifecycleEvent)
      })
    ]
  };
};
