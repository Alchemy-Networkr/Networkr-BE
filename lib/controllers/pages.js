const { Router } = require('express');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');

module.exports = 
  Router()
    .get('/home', authMiddleware, async(req, res) => {
      res.render('home', {
        message: req.user.email
      });
    });
