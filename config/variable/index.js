const helper = require('../helper');
const path = require('path');

/* Paths info */
const paths = {
  // Function to join paths
  join: helper.join,
  // <root>/
  root: helper.root(),
  // <root>/_dist
  dist: helper.root('_dist'),
  // <root>/_dist/app
  distApp: helper.root('_dist', 'app'),
  // <root>/_dist/app
  distAppFont: helper.root('_dist', 'app', 'asset', 'font'),
  // <root>/_dist/core
  distCore: helper.root('_dist', 'core'),
  // <root>/_dist
  report: helper.root('_report'),
  // <root>/config
  config: helper.root('config'),
  // <root>/server
  sever: helper.root('server'),
  // <root>/server
  appViewTemplate: helper.root('server', 'app', 'views', 'index.ejs'),
  // <root>/src
  source: helper.root('src'),
  // <root>/src/app
  app: helper.root('src', 'app'),
  // <root>/src/core
  core: helper.root('src', 'core'),
  // <root>/src/app/asset
  coreAsset: helper.root('src', 'core', 'asset'),
  // <root>/src/app/asset/font
  font: path.join('asset', 'font'),
  // <root>/src/app/asset/image
  image: path.join('asset', 'image')
};

/* Urls info */
const urls = {
  image: helper.url('asset', 'image'),
  font: helper.url('asset', 'font'),
  style: helper.url('asset', 'style')
};

/* Hosts info */
const hosts = {
  app: process.env.HOST || '0.0.0.0'
};

/* Ports info */
const ports = {
  app: process.env.PORT || 8000,
  prod: process.env.PORT_PROD || 8001,
  test: process.env.PORT_TEST || 9000
};

const distPublicPaths = {
  // DIST_PUBLIC_PATH_APP is the CDN public path where we store the dist directory. Ex:
  // DIST_PUBLIC_PATH_APP=https://s3.amazonaws.com/my-app/path
  // Intentionally fallback to 'undefined' so that css-loader will resolve @import and/or
  // url() properly when running Production mode at localhost (ex: 'npm run front-prod').
  // DIST_PUBLIC_PATH_APP not being set correctly will cause build
  // error or runtime error.
  app: process.env.DIST_PUBLIC_PATH_APP || undefined
};

/* Export info */
module.exports = {
  paths,
  urls,
  hosts,
  ports,
  distPublicPaths
};
