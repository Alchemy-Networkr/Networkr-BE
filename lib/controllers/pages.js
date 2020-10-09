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
    })
    
    .get('/All-Portfolio-Projects/:id', authMiddleware, async(req, res) => {
      const detailedPortfolio = await PortfolioProject.findById(req.params.id);
      console.log(detailedPortfolio);
      res.render('Detailed-Portfolio', {
        detailedPortfolio
      });
    })

    .get('/JavaScript', authMiddleware, async(req, res) => {
      const allPortfolioProjects = await PortfolioProject.find();
      const javascriptProjects = [];
      allPortfolioProjects.map(project => {
        if(project.primaryLanguage === 'JavaScript') {
          javascriptProjects.push(project);
        }
      });
      res.render('JavaScript', {
        javascriptProjects
      });
    })

    .get('/HTML', authMiddleware, async(req, res) => {
      const allPortfolioProjects = await PortfolioProject.find();
      const htmlProjects = [];
      allPortfolioProjects.map(project => {
        if(project.primaryLanguage === 'HTML') {
          htmlProjects.push(project);
        }
      });
      res.render('HTML', {
        htmlProjects
      });
    })

    .get('/CSS', authMiddleware, async(req, res) => {
      const allPortfolioProjects = await PortfolioProject.find();
      const cssProjects = [];
      allPortfolioProjects.map(project => {
        if(project.primaryLanguage === 'CSS') {
          cssProjects.push(project);
        }
      });
      res.render('CSS', {
        cssProjects
      });
    })

    .get('/Python', authMiddleware, async(req, res) => {
      const allPortfolioProjects = await PortfolioProject.find();
      const pythonProjects = [];
      allPortfolioProjects.map(project => {
        if(project.primaryLanguage === 'Python') {
          pythonProjects.push(project);
        }
      });
      res.render('Python', {
        pythonProjects
      });
    });

//endpoint for logout -> res.redirect to middleware 
