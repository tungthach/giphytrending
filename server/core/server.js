const express = require('express');
const compression = require('compression');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const DEVELOPMENT = 'development';
const DEFAULT_HOST = '0.0.0.0';

/**
 * Base Server class is used for front and app site
 */
class Server {

  /**
   * Constructor: parse options
   * @param  {Object} options [options for webpack config, routes]
   * @return {Void}
   */
  constructor(options) {
    this.options = options;
    this.app = express();
    this.parseOptions = this.parseOptions.bind(this);
    this.configExpress = this.configExpress.bind(this);
    this.registerRoutes = this.registerRoutes.bind(this);

    this.parseOptions();
  }

  /**
   * Parse options and set to this
   * @return {Void}
   */
  parseOptions() {
    const { config, routes } = this.options;
    const host = config.settings.host || DEFAULT_HOST;
    const port = config.settings.port;
    const env = process.env.NODE_ENV || DEVELOPMENT;

    this.config = config;
    this.host = host;
    this.port = port;
    this.env = env;
    this.routes = routes;
    this.isDevMode = env.toLowerCase() === DEVELOPMENT;
  }

  /**
   * Configure express server:
   * - use compression mode
   * - use body json parser
   * - config webpack hot module in development mode
   * - set pug view
   * @return {Void}
   */
  configExpress() {
    const { config, app, isDevMode } = this;

    app.use(compression());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // Case DEV mode
    if (isDevMode) {
      const webpackConfig = config.webpack;
      const compiler = webpack(webpackConfig);

      app.use(webpackHotMiddleware(compiler));
      app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        /* Comment it if you don't want to see much info */
        // noInfo: true,
        stats: {
          colors: true,
          timings: true,
          assets: false,
          version: false,
          hash: false,
          /* Do not show chunk files here */
          // chunks: false,
          chunkModules: false,
          warnings: false
        }
      }));

      // Set compiler so that in each route can access the webpack compiler
      this.app.set('compiler', compiler);
    }

    console.log('this.options.viewsPath', this.options.viewsPath)

    app.set('views', this.options.viewsPath);
    app.set('view engine', 'pug');
  }

  /**
   * Register routes
   * - asset
   * - robots.txt
   * - other routes
   * @return {Void}
   */
  registerRoutes() {
    const { config, app, isDevMode, routes } = this;

    // Add static asset for DEV mode
    if (isDevMode) {
      app.use('/asset', express.static(config.settings.paths.coreAsset));
    }

    // Add robots.txt
    app.use('/robots.txt', express.static(`${__dirname}/resources/robots.txt`));

    // Add route handler
    if (routes) {
      routes.forEach(route => app.use(...route));
    }
  }

  /**
   * This is abstract method, inheriter must implement this method
   * @return {Void}
   */
  onServerStarted() {
    throw new Error('Not implemented onServerStarted');
  }

  /**
   * Start Express server
   * - Config Express
   * - Register routes
   * - Start server
   * @return {Void}
   */
  start() {
    const { app, config, port, onServerStarted, configExpress, registerRoutes } = this;

    // Config express app
    configExpress();

    // register routes
    registerRoutes();

    // start server
    app.listen(port, config.settings.host, onServerStarted);
  }
}

module.exports = Server;
