const express = require('express');
const path = require('path');
const router = express.Router();
const checkAuthentication = require('server/core/auth');

router.get('', (req, res) => {
  if (!checkAuthentication(req, res)) {
    return;
  }

  const compiler = req.app ? req.app.get('compiler') : null;

  // Dev mode for local machine
  if (compiler) {
    // Read file content from memory
    console.log('outputPath==============', compiler.outputPath)
    const filename = path.join(compiler.outputPath, 'index.html');
    const html = compiler.outputFileSystem.readFileSync(filename, 'utf8');

    res.send(html);
    res.end();
  }
  // Prod mode for local machine
  else {
    res.render('index');
  }
});

module.exports = ['*', router];
