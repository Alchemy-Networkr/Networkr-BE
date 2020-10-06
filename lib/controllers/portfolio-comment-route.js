const PortfolioComment = require('../models/portfolio-comment');
const { Router } = require('express');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');
const authorizedUserRequest = require('../middleware/authorizedUserRequest');


module.exports = Router()
  .post('/', authMiddleware, (req, res, next) => {
    PortfolioComment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/', authMiddleware, (req, res, next) => {
    PortfolioComment
      .findAll()
      .then(comments => res.send(comments))
      .catch(next);
  })
  
  .delete('/:id', authMiddleware, authorizedUserRequest, (req, res, next) => {
    PortfolioComment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .patch('/:id', authMiddleware, authorizedUserRequest, (req, res, next) => {
    PortfolioComment
      .update(req.params.id, req.body.comment)
      .then(updatedComment => res.send(updatedComment))
      .catch(next);
  });
