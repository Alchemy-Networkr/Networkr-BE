const PortfolioComment = require('../models/portfolio-comment');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    PortfolioComment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  });
