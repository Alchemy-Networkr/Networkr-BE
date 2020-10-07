const { Router } = require('express');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const CurriculumProject = require('../models/curriculum-model');

module.exports = 
  Router()
    .get('/home', authMiddleware, async(req, res) => {
      res.render('home', {
        message: `You are signed in as: ${req.user.email}`,
        
      });
    })

    .get('/Foundations-1', authMiddleware, async(req, res) => {
      const foundations1Projects = await CurriculumProject.findByModule('Foundations-1');
      res.render('Foundations-1', {
        foundations1Projects
      });
    });
