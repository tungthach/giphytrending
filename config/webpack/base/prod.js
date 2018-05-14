const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./base');
const { paths, urls } = baseConfig.settings;

module.exports = {
  /**
   * Extract plugins
   * @return {Object} [Extract Text plugin including: app.css & lib.css]
   */
  extractPlugins() {
    const lib = new ExtractTextPlugin(`${urls.style}/libs.[hash].css`);
    const app = new ExtractTextPlugin(`${urls.style}/app.[hash].css`);

    return { lib, app };
  },

  /**
   * Get plugins for appropriate project in PRODUCTION mode
   *
   * @param  {String} distPath        The target built path
   * @return {Array}                  Array of plugins that project uses
   */
  plugins: distPath => ([
    /* Used to split out our sepcified vendor script
     * CommonChunksPlugin will now extract all the common modules from vendor, app, webpack,... bundles
     * Set minChunks is 'Infinity' to run in production mode normally
     */
    new webpack.optimize.CommonsChunkPlugin({
      names: ['webpack', 'vendor', 'manifest'],
      minChunks: Infinity
    }),

    /* Uglify JS */
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        dead_code: true,
        screw_ie8: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),

    /* Copy core fonts & images */
    new CopyWebpackPlugin([{
      from: paths.coreFont,
      to: paths.join(distPath, paths.font)
    }, {
      from: paths.coreImage,
      to: paths.join(distPath, paths.image)
    }]),

    /* Setting DefinePlugin affects React library size! */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVELOPMENT__: false,
      /* DISABLE redux-devtools HERE */
      __DEVTOOLS__: false
    })
  ]),
  stats: {
    assets: true,
    cached: true,
    children: false,

    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: true,
    // Add built modules information to chunk information
    chunkModules: true,
    colors: true,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    timings: true,
    warnings: true
  }
};
