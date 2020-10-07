const { Router  } = require('express');
const PortfolioProject = require('../models/portfolio-model');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const authorizedUserRequest = require('../middleware/authorizedUserRequest');

module.exports = Router()
  .post('/', authMiddleware, (req, res, next) => {
    PortfolioProject

      .insert({ ...req.body, ownerEmail: req.user.email })

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
