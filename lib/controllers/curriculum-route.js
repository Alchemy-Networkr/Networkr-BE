const { Router } = require('express');
const CurriculumProject = require('../models/curriculum-model');

module.exports = Router()
  .post('/', (req, res, next) => {
    CurriculumProject
      .insert(req.body)
      .then(project => res.send(project))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    CurriculumProject
      .find()
      .then((project) => res.send(project))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    CurriculumProject
      .findById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    CurriculumProject
      .updateById(req.body, req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    CurriculumProject
      .deleteById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  });


