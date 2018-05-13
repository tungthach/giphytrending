/* eslint-disable no-console*/
const express = require('express');
const Server = require('../core/server');

/**
 * Server for app site
 */
class AppServer extends Server {
  constructor(options) {
    super(options);

    this.onServerStarted = this.onServerStarted.bind(this);
  }

  /**
   * Log information after server started
   * @param  {Object} error [error object]
   * @return {Void}
   */
  onServerStarted(error) {
    const { env, host, port } = this;

    if (error) {
      console.info("⛔ ⛔ ⛔  *** ERROR *** ⛔ ⛔ ⛔");
      console.error(error);
    }
    else {
      console.info("✅ ✅ ✅  *** %s mode's started *** ✅ ✅ ✅", env.toUpperCase());
      console.info("✅ ✅ ✅  *** Listening at http://%s:%s *** ✅ ✅ ✅", host, port);
    }
  }

  /**
   * Set static path if environment is not development mode
   * @return {Void}
   */
  configExpress() {
    super.configExpress();

    const { config, app, isDevMode } = this;

    // Case not Development mode
    app.use(express.static(config.settings.paths.distApp));
    // if (!isDevMode) {
    //   app.use(express.static(config.settings.paths.distApp));
    // }
  }
}

module.exports = AppServer;
