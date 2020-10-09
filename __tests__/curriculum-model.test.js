require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const CurriculumProject = require('../lib/models/curriculum-model');
const CurriculumComment = require('../lib/models/curriculum-comment');

describe('curriculum routes', () => {
  it('should create a curriculum project using POST', async() => {
    return await request(app)
      .post('/api/v1/curriculumProjects')
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

  it('should insert a portfolio projects with a given github repo link and description via POST', async() => {
    const githubLink = 'https://github.com/Alchemy-Networkr/Networkr-BE';
    const description = 'a repo';
    return await request(app)
      .post('/api/v1/curriculumProjects/githubLink')
      .send({
        url: githubLink,
        description
      })
      .then(res => expect(res.body).toEqual({
        title: 'Networkr-BE',
        description: 'a repo',
        group: expect.arrayContaining([
          'katiepdx',
          'bwapes',
          'EdgarPDX',
          'asimental100',
          'Nate-Kruck',
          'warrioryoko'
        ]),
        cohort: 'Put your cohort here!',
        tags: ['JavaScript', 'Pug', 'CSS'],
        curriculumId: '26',
        githubLink: 'https://github.com/Alchemy-Networkr/Networkr-BE',
        deployedBackEnd: 'Put a link to your back end here!',
        deployedFrontEnd: 'https://networkr-be.herokuapp.com/'
      }
      ));
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
      .get('/api/v1/curriculumProjects')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([{ ...newProject, curriculumId: expect.any(String) }]));
      });
  });

  it('should find all curriculum_projects by module using tags via GET', async() => {
    return await request(app)
      .get('/api/v1/curriculumProjects/module/Foundations-1')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            curriculumId: expect.any(String),
            title: expect.any(String),
            githubLink: expect.any(String),
            description: expect.any(String),
            group: expect.any(Array),
            cohort: expect.any(String),
            tags: ['Foundations-1'],
            deployedBackEnd: expect.any(String),
            deployedFrontEnd: expect.any(String) 
          }
        ]));
      });
      
  });

  it('should find curriculum_project by ID with no comments on that project via GET', async() => {
    const addProject = await CurriculumProject.insert({ 
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
      .get(`/api/v1/curriculumProjects/${Number(addProject.curriculumId)}`)
      .then(res => expect(res.body).toEqual({ ...addProject, curriculumId: expect.any(String)  }));
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
      .get(`/api/v1/curriculumProjects/${newProject.curriculumId}`)
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
      .put(`/api/v1/curriculumProjects/${newProject.curriculumId}`)
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
      .delete(`/api/v1/curriculumProjects/${newProject.curriculumId}`)
      .then(res => expect(res.body).toEqual({
        ...newProject, curriculumId: expect.any(String)
      }));
  });
});

describe('curriculumComment class', () => {
  it('should add a comment via POST', async() => {

    const addComment = { ownerEmail: 'instruction@alchemycodelab.io', comment: 'test the comment', curriculumId: 1 };
    return await request(app)
      .post('/api/v1/curriculumComments')
      .send(addComment)
      .then(res => expect(res.body).toEqual({ ...addComment, ownerEmail: res.body.ownerEmail, id: expect.any(String), curriculumId: expect.any(String) }));
  });

  it('should return all comments via GET', async() => {
    return await request(app)
      .get('/api/v1/curriculumComments')
      .then(res => expect(res.body.length).toEqual(50));
  });
  // add routes for auth -> one for a good request, one for a bad request(user tries to delete a comment they didnt make)

  it('should delete a comment via DELETE if the owner emails match', async() => {
    const addedComment = await CurriculumComment.insert({ ownerEmail: 'instruction@alchemycodelab.io', comment: 'test the comment', curriculumId: 1 });
    return await request(app)
      .delete(`/api/v1/CurriculumComments/${addedComment.id}`)
      .send(addedComment)
      .then(res => expect(res.body).toEqual(addedComment));
  });
 
  it('should update a comment via PATCH if the owner emails match', async() => {
    const addedComment = await CurriculumComment.insert({ ownerEmail: 'instruction@alchemycodelab.io', comment: 'test the comment', curriculumId: 1 });
    const updatedComment = { ...addedComment, comment: 'test the comment update route' };
    return await request(app)
      .patch(`/api/v1/CurriculumComments/${addedComment.id}`)
      .send(updatedComment)
      .then(res => expect(res.body).toEqual({ ...addedComment, comment: updatedComment.comment }));

  });
});
