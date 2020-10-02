const { Router } = require('express');
const Curriculum_Project = require('../models/curriculum-model');

module.exports = Router()
  .post('/', (req, res, next) => {
    Curriculum_Project
      .insert(req.body)
      .then(project => res.send(project))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Curriculum_Project
      .find()
      .then((project) => res.send(project))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Curriculum_Project
      .findById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Curriculum_Project
      .updateById(req.body, req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Curriculum_Project
      .deleteById(req.params.id)
      .then((project) => res.send(project))
      .catch(next);
  });


