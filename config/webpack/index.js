/* eslint-disable no-console*/
const { env: environment } = process;
const { npm_lifecycle_event, BUILD } = environment;
const target = npm_lifecycle_event || '';

environment.BABEL_ENV = target;

console.log("? ? ?  *** Running %s command *** ? ? ?", target.toUpperCase());

switch (target.toLowerCase()) {
  case 'dev': {
    const dev = require('./app/dev');

    console.log("? ? ?  *** DEVELOPMENT mode starts up *** ? ? ?");

    process.env.NODE_ENV = 'development';
    module.exports = dev;
    break;
  }
  case 'start':
  case 'build':
  case 'prod':
  const appProd = require('./app/prod');

    module.exports = BUILD ? appProd.webpack : appProd;
    break;
}
