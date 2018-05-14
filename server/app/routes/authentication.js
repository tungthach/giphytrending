const express = require('express');
const router = express.Router();

router
  .post('', (req, res) => {
    const { username, password } = req.body;
    let result = {};

    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        result = {
          success: true,
          data: {
            id: 1,
            username,
            email: 'admin@domain.com',
            fullName: 'Administrator'
          }
        };
      }
      else {
        result = {
          success: false,
          message: 'The username or password is wrong.'
        };
      }
      res.send(result);
    }, 1000);
  });

module.exports = ['/authentication', router];
