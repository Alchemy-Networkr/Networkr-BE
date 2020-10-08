const { Router } = require('express');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const CurriculumProject = require('../models/curriculum-model');
const PortfolioProject = require('../models/portfolio-model');

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
    })

    .get('/Foundations-2', authMiddleware, async(req, res) => {
      const foundations2Projects = await CurriculumProject.findByModule('Foundations-2');
      res.render('Foundations-2', {
        foundations2Projects
      });
    })

    .get('/Career-Track-1', authMiddleware, async(req, res) => {
      const careerTrack1Projects = await CurriculumProject.findByModule('Career-Track-1');
      res.render('Career-Track-1', {
        careerTrack1Projects
      });
    })


    .get('/Career-Track-2', authMiddleware, async(req, res) => {
      const careerTrack2Projects = await CurriculumProject.findByModule('Career-Track-2');
      res.render('Career-Track-2', {
        careerTrack2Projects
      });
    })

    .get('/All-Curriculum-Projects', authMiddleware, async(req, res) => {
      const allCurriculumProjects = await CurriculumProject.find();
      res.render('Curriculum-Projects', {
        allCurriculumProjects
      });
    })

    .get('/All-Portfolio-Projects', authMiddleware, async(req, res) => {
      const allPortfolioProjects = await PortfolioProject.find();
      res.render('Portfolio-Projects', {
        allPortfolioProjects
      });
    });
