const CurriculumComment = require('../models/curriculum-comment');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    CurriculumComment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    CurriculumComment
      .findAll()
      .then(comments => res.send(comments))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    CurriculumComment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    CurriculumComment
      .update(req.params.id, req.body.comment)
      .then(updatedComment => res.send(updatedComment))
      .catch(next);
  });
