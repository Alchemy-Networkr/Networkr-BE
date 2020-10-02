const { Router  } = require('express');
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
  });
