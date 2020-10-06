const { Router } = require('express');
const CurriculumProject = require('../models/curriculum-model');
const { authMiddleware } = require('@alchemycodelab/auth-middleware');

module.exports = Router()
  .post('/', authMiddleware, (req, res, next) => {
    CurriculumProject
      .insert(req.body)
      .then(project => res.send(project))
      .catch(next);
  })
  
  .get('/', authMiddleware, (req, res, next) => {
    CurriculumProject
      .find()
      .then((project) => res.send(project))
      .catch(next);
  })

  .get('/:id', authMiddleware, (req, res, next) => {
    CurriculumProject
      .findById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .put('/:id', authMiddleware, (req, res, next) => {
    CurriculumProject
      .updateById(req.body, req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .delete('/:id', authMiddleware, (req, res, next) => {
    CurriculumProject
      .deleteById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  });


