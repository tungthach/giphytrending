const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  /**
   * Get plugins for appropriate project in DEVELOPMENT mode
   * @param  {Int} port    [Port number]
   * @return {Array}       [Array of plugins that project uses]
   */
  plugins: (port) => [
    new webpack.HotModuleReplacementPlugin(),

    /* Used to split out our sepcified vendor script
     * CommonChunksPlugin will now extract all the common modules from vendor, app, webpack,... bundles
     * Remove minChunks in development mode to stop auto generated hot-update.js file and
     * map to source file correctly in debug mode
     */
    new webpack.optimize.CommonsChunkPlugin({
      names: ['webpack', 'vendor', 'manifest']
    }),

    /* Auto open browser */
    new WebpackBrowserPlugin({
      port,
      browser: 'Chrome',
      url: 'http://localhost'
    }),

    /* Circular dependency checking */
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true
    }),

    /* Setting DefinePlugin affects React library size! */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEVELOPMENT__: true,
      /* DISABLE redux-devtools HERE */
      __DEVTOOLS__: false,
      /* DISABLE "Download the React DevTools for a better development experience: https://fb.me/react-devtools" */
      __REACT_DEVTOOLS_GLOBAL_HOOK__: {
        supportsFiber: true,
        inject: () => {},
        onCommitFiberRoot: () => {},
        onCommitFiberUnmount: () => {}
      }
    })
  ]
};
