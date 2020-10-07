const { Router } = require('express');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');

module.exports = 
  Router()
    .get('/home', authMiddleware, async(req, res) => {
      res.render('home', {
        message: `You are signed in as: ${req.user.email}`,
        
      });
    });
