const auth = require('basic-auth');
const account = require('./resources/account.json');

/**
 * Validate credential
 * @param  {object} req Request object
 * @param  {object} res Response object
 * @return {boolean} true if credential is valid
 */
const validateCredential = (req, res) => {
  const credential = auth(req);

  if (!credential || credential.name !== account.username || credential.pass !== account.password) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Authenticate user for Application"');
    res.end('Access denied');

    return false;
  }

  return true;
};

module.exports = validateCredential;
