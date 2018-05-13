const Server = require('./app.server');
const config = require('config/webpack');
const routes = require('./routes');

const DEFAULT_SERVER_PORT = 8001;

config.settings.port = config.settings.port || DEFAULT_SERVER_PORT;

const options = {
  config,
  viewsPath: config.webpack.output.path
};

const server = new Server(options);

server.start();
