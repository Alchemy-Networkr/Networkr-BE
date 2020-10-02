const { Router  } = require('express');
const PortfolioProject = require('../models/portfolio-model');

module.exports = Router()
  .post('/', (req, res, next) => {
    PortfolioProject
      .insert(req.body)
      .then(project => res.send(project))
      .catch(next);
  });
