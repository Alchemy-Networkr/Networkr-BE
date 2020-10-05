const PortfolioComment = require('../models/portfolio-comment');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    PortfolioComment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    PortfolioComment
      .findAll()
      .then(comments => res.send(comments))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    PortfolioComment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    PortfolioComment
      .update(req.params.id, req.body.comment)
      .then(updatedComment => res.send(updatedComment))
      .catch(next);
  });
