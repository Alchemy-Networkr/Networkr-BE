require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const CurriculumProject = require('../lib/models/curriculum-model');
const CurriculumComment = require('../lib/models/curriculum-comment');

describe('curriculum routes', () => {
  it('should create a curriculum project using POST', async() => {
    return await request(app)
      .post('/api/v1/curriculum')
      .send({
        title: 'Some project',
        githubLink: 'Some link',
        description: 'Some description',
        group: ['person1', 'person2'],
        cohort: 'Some cohort',
        tags: ['tag1', 'tag2'],
        deployedBackEnd: 'Some link',
        deployedFrontEnd: 'Some link' 
      })
      .then(res => {
        expect(res.body).toEqual({
          curriculumId: expect.any(String),
          title: 'Some project',
          githubLink: 'Some link',
          description: 'Some description',
          group: ['person1', 'person2'],
          cohort: 'Some cohort',
          tags: ['tag1', 'tag2'],
          deployedBackEnd: 'Some link',
          deployedFrontEnd: 'Some link' 
        });
      });
  });

  it('should get all curriculum projects using GET', async() => {
    const newProject = await CurriculumProject.insert({
      title: 'Some project',
      githubLink: 'Some link',
      description: 'Some description',
      group: ['person1', 'person2'],
      cohort: 'Some cohort',
      tags: ['tag1', 'tag2'],
      deployedBackEnd: 'Some link',
      deployedFrontEnd: 'Some link' 
    });
 
    return await request(app)
      .get('/api/v1/curriculum')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([{ ...newProject, curriculumId: expect.any(String) }]));
      });
  });

  it('finds a project by id using GET', async() => {
    const newProject = await CurriculumProject.insert({
      title: 'GetById',
      githubLink: 'Some link',
      description: 'Some description',
      group: ['person1', 'person2'],
      cohort: 'Some cohort',
      tags: ['tag1', 'tag2'],
      deployedBackEnd: 'Some link',
      deployedFrontEnd: 'Some link' 
    }); 

    return await request(app)
      .get(`/api/v1/curriculum/${newProject.curriculumId}`)
      .then(res => {
        expect(res.body).toEqual({ ...newProject, curriculumId: expect.any(String) });
      });
  });

  it('should update an existing curriculum project', async() => {
    const newProject = await CurriculumProject.insert({
      title: 'GetById',
      githubLink: 'Some link',
      description: 'Some description',
      group: ['person1', 'person2'],
      cohort: 'Some cohort',
      tags: ['tag1', 'tag2'],
      deployedBackEnd: 'Some link',
      deployedFrontEnd: 'Some link' 
    });
    return await request(app)
      .put(`/api/v1/curriculum/${newProject.curriculumId}`)
      .send({
        title: 'GetById',
        githubLink: 'Some other link',
        description: 'Some other description',
        group: ['aDifferentPerson1', 'aDifferentPerson2'],
        cohort: 'Some loser cohort',
        tags: ['tag1', 'tag2'],
        deployedBackEnd: 'Some link',
        deployedFrontEnd: 'Some link' 
      })
      .then(res => expect(res.body).toEqual({
        curriculumId: expect.any(String),
        title: 'GetById',
        githubLink: 'Some other link',
        description: 'Some other description',
        group: ['aDifferentPerson1', 'aDifferentPerson2'],
        cohort: 'Some loser cohort',
        tags: ['tag1', 'tag2'],
        deployedBackEnd: 'Some link',
        deployedFrontEnd: 'Some link' 
      }));
  });

  it('should delete a curriculum project', async() => {
    const newProject = await CurriculumProject.insert({
      title: 'GetById',
      githubLink: 'Some link',
      description: 'Some description',
      group: ['person1', 'person2'],
      cohort: 'Some cohort',
      tags: ['tag1', 'tag2'],
      deployedBackEnd: 'Some link',
      deployedFrontEnd: 'Some link' 
    });
    return await request(app)
      .delete(`/api/v1/curriculum/${newProject.curriculumId}`)
      .then(res => expect(res.body).toEqual({
        ...newProject, curriculumId: expect.any(String)
      }));

  });
});

describe('CurriculumComment class', () => {
  it('should add a comment via POST', async() => {
    const addComment = { email: 'ben@ben.com', comment: 'test the comment', curriculumId: 1 };
    return await request(app)
      .post('/api/v1/curriculumComments')
      .send(addComment)
      .then(res => expect(res.body).toEqual({ ...addComment, id: expect.any(String), curriculumId: expect.any(String) }));
  });

  it('should return all comments via GET', async() => {
    return await request(app)
      .get('/api/v1/curriculumComments')
      .then(res => expect(res.body.length).toEqual(50));
  });
  // add routes for auth -> one for a good request, one for a bad request(user tries to delete a comment they didnt make)
  it('should delete a comment via DELETE', async() => {
    const firstComment = (await CurriculumComment.findAll())[0];
    return await request(app)
      .delete(`/api/v1/curriculumComments/${firstComment.id}`)
      .then(res => expect(res.body).toEqual(firstComment));
  });

  it('should update a comment via PATCH', async() => {
    const firstComment = (await CurriculumComment.findAll())[0];
    const updatedComment = { comment: 'test the comment update route' };
    return await request(app)
      .patch(`/api/v1/curriculumComments/${firstComment.id}`)
      .send(updatedComment)
      .then(res => expect(res.body).toEqual({ ...firstComment, comment: updatedComment.comment }));
  });
});

