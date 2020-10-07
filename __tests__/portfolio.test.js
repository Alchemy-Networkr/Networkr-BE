require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const { getAgent } = require('../lib/data/data-helper');
const PortfolioProject = require('../lib/models/portfolio-model');
const PortfolioComment = require('../lib/models/portfolio-comment');

describe('networkr routes', () => {

  it('should test POST route', async() => {
    return await request(app)
      .post('/api/v1/portfolioProjects')
      .send({ 
        ownerEmail: 'ben@ben.com',
        title: 'title', 
        primaryLanguage: 'js', 
        date: '2020-10-02', 
        githubLink: 'google.com', 
        description: 'this is my project', 
        collaborators: ['ben, edgar, adrian'], 
        open: true }) 
      .then(res => expect(res.body).toEqual({ 
        portfolioId: expect.any(String),

        ownerEmail: res.body.ownerEmail,

        title: 'title', 
        primaryLanguage: 'js', 
        date: expect.stringContaining('2020-10-02'), 
        githubLink: 'google.com', 
        description: 'this is my project', 
        collaborators: ['ben, edgar, adrian'], 
        open: true
      }));
  });

  it('should find portfolio_project by ID with all comments on that project via GET', async() => {
    const addProject = (await PortfolioProject.find())[0];

    return await request(app)
      .get(`/api/v1/portfolioProjects/${Number(addProject.portfolioId)}`)
      .then(res => expect(res.body).toEqual({ ...addProject, comments: expect.any(Array), date: expect.any(String) }));
  });

  it('should find portfolio_project by ID with no comments on that project via GET', async() => {
    const addProject = await PortfolioProject.insert({ 
      ownerEmail: 'ben@ben.com',
      title: 'title', 
      primaryLanguage: 'js', 
      date: '2020-10-02', 
      githubLink: 'google.com', 
      description: 'this is my project', 
      collaborators: ['ben, edgar, adrian'], 
      open: true });

    return await request(app)
      .get(`/api/v1/portfolioProjects/${Number(addProject.portfolioId)}`)
      .then(res => expect(res.body).toEqual({ ...addProject, date: expect.any(String) }));
  });

  it('should find all projects via GET', async() => {
    const addProject = await PortfolioProject.insert({ 
      ownerEmail: 'ben@ben.com',
      title: 'title', 
      primaryLanguage: 'js', 
      date: '2020-10-02', 
      githubLink: 'google.com', 
      description: 'this is my project', 
      collaborators: ['ben, edgar, adrian'], 
      open: true });

   
    return await request(app)
      .get('/api/v1/portfolioProjects')
      .then(res => expect(res.body).toEqual(expect.arrayContaining([{ ...addProject, date: expect.stringContaining('2020-10-02') }])));

  });

  it('should delete a project by id via DELETE', async() => {
    const firstPortfolio = (await PortfolioProject.find())[0];
    return await request(app)
      .delete(`/api/v1/portfolioProjects/${firstPortfolio.portfolioId}`)
      .then(res => expect(res.body).toEqual({ ...firstPortfolio, date: expect.any(String) }));
  });

  it('should update a project by id via PUT', async() => {
    const firstPortfolio = (await PortfolioProject.find())[0];
    const updateDetails = { 
      ownerEmail: firstPortfolio.ownerEmail,
      title: 'new title', 
      primaryLanguage: 'node.js', 
      date: '2020-10-02', 
      githubLink: 'google.com', 
      description: 'this is my project', 
      collaborators: ['ben, edgar, adrian'], 
      open: true };
    return await request(app)
      .patch(`/api/v1/portfolioProjects/${firstPortfolio.portfolioId}`)
      .send(updateDetails)
      .then(res => expect(res.body).toEqual({ ...updateDetails, portfolioId: firstPortfolio.portfolioId, date: expect.any(String) }));
  });
});

describe('PortfolioComment class', () => {
  it('should add a comment via POST', async() => {
    const addComment = { ownerEmail: 'ben@ben.com', comment: 'test the comment', portfolioId: 1 };
    return await request(app)
      .post('/api/v1/portfolioComments')
      .send(addComment)

      .then(res => expect(res.body).toEqual({ ...addComment, ownerEmail: res.body.ownerEmail, id: expect.any(String), portfolioId: expect.any(String) }));

  });

  it('should return all comments via GET', async() => {
    return await request(app)
      .get('/api/v1/portfolioComments')
      .then(res => expect(res.body.length).toEqual(50));
  });
  // add routes for auth -> one for a good request, one for a bad request(user tries to delete a comment they didnt make)
  it('should delete a comment via DELETE if the owner emails match', async() => {
    const addedComment = await PortfolioComment.insert({ ownerEmail: 'instruction@alchemycodelab.io', comment: 'test the comment', portfolioId: 1 });
    return await request(app)
      .delete(`/api/v1/portfolioComments/${addedComment.id}`)
      .send(addedComment)
      .then(res => expect(res.body).toEqual(addedComment));
  });
 
  it('should update a comment via PATCH if the owner emails match', async() => {
    const addedComment = await PortfolioComment.insert({ ownerEmail: 'instruction@alchemycodelab.io', comment: 'test the comment', portfolioId: 1 });
    const updatedComment = { ...addedComment, comment: 'test the comment update route' };
    return await request(app)
      .patch(`/api/v1/portfolioComments/${addedComment.id}`)
      .send(updatedComment)
      .then(res => expect(res.body).toEqual({ ...addedComment, comment: updatedComment.comment }));

  });
});
