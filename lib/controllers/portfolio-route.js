const { Router  } = require('express');
const PortfolioProject = require('../models/portfolio-model');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const authorizedUserRequest = require('../middleware/authorizedUserRequest');
const pullRepoData = require('../utils/pullRepoData');

module.exports = Router()
  .post('/', authMiddleware, (req, res, next) => {
    const now = new Date();
    const dateString = `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
    
    PortfolioProject
      .insert({ ...req.body, ownerEmail: req.user.email, open: true, date: dateString })
      .then(project => res.send(project))
      .catch(next);
  })

  .post('/githubLink', authMiddleware, async(req, res, next) => {
    const repoData = await pullRepoData(req.body.url, req);
    PortfolioProject
      .insert({ 
        ...repoData,
        ownerEmail: req.user.email, 
        open: true, 
      })
      .then(project => res.send(project))
      .catch(next);
  })

  .get('/:id', authMiddleware, (req, res, next) => {
    PortfolioProject
      .findById(Number(req.params.id))
      .then(project => res.send(project))
      .catch(next);
  })

  .get('/', authMiddleware, (req, res, next) => {
    PortfolioProject
      .find()
      .then(project => res.send(project))
      .catch(next);
  })
  
  .delete('/:id', authMiddleware, authorizedUserRequest, (req, res, next) => {
    PortfolioProject
      .delete(req.params.id)
      .then(project => res.send(project))
      .catch(next);
  })
  
  .patch('/:id', authMiddleware, authorizedUserRequest, (req, res, next) => {
    PortfolioProject
      .update(req.params.id, req.body)
      .then(project => res.send(project))
      .catch(next);
  });
