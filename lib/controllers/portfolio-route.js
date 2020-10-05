const { Router  } = require('express');
const verifyUser = require('../middleware/verifyUser');
const PortfolioProject = require('../models/portfolio-model');

module.exports = Router()
  .post('/', (req, res, next) => {
    PortfolioProject
      .insert(req.body)
      .then(project => res.send(project))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    PortfolioProject
      .findById(Number(req.params.id))
      .then(project => res.send(project))
      .catch(next);
  })

  .get('/', verifyUser, (req, res, next) => {
    PortfolioProject
      .find()
      .then(project => res.send(project))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    PortfolioProject
      .delete(req.params.id)
      .then(project => res.send(project))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    PortfolioProject
      .update(req.params.id, req.body)
      .then(project => res.send(project))
      .catch(next);
  });
