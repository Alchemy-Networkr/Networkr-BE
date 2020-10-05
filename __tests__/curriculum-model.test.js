require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const CurriculumProject = require('../lib/models/curriculum-model');

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
