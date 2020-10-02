const fs = require('fs');
const pool = require('../../utils/pool');
const request = require('supertest');
const app = require('../../app');
const Curriculum_Project = require('../curriculum-model');

describe('curriculum routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

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
    const newProject = await Curriculum_Project.insert({
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
});
