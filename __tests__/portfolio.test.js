require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const { getAgent } = require('../lib/data/data-helper');
const PortfolioProject = require('../lib/models/portfolio-model');

describe('networkr routes', () => {

  it('should test POST route', async() => {
    return await request(app)
      .post('/api/v1/portfolioProjects')
      .send({ 
        title: 'title', 
        primaryLanguage: 'js', 
        date: '2020-10-02', 
        githubLink: 'google.com', 
        description: 'this is my project', 
        collaborators: ['ben, edgar, adrian'], 
        open: true })
      .then(res => expect(res.body).toEqual({ 
        portfolioId: expect.any(String),
        title: 'title', 
        primaryLanguage: 'js', 
        date: expect.stringContaining('2020-10-02'), 
        githubLink: 'google.com', 
        description: 'this is my project', 
        collaborators: ['ben, edgar, adrian'], 
        open: true
      }));
  });

  it('should find portfolio_project by ID via GET', async() => {
    const addProject = await PortfolioProject.insert({ 
      title: 'title', 
      primaryLanguage: 'js', 
      date: '2020-10-02', 
      githubLink: 'google.com', 
      description: 'this is my project', 
      collaborators: ['ben, edgar, adrian'], 
      open: true });



    return await request(app)
      .get(`/api/v1/portfolioProjects/${addProject.portfolioId}`)
      .then(res => expect(res.body).toEqual({ ...addProject, date: expect.stringContaining('2020-10-02') }));
  });


  it('should find all projects via GET', async() => {
    const addProject = await PortfolioProject.insert({ 
      title: 'title', 
      primaryLanguage: 'js', 
      date: '2020-10-02', 
      githubLink: 'google.com', 
      description: 'this is my project', 
      collaborators: ['ben, edgar, adrian'], 
      open: true });

   
    return await getAgent()
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
    const addComment = { email: 'ben@ben.com', comment: 'test the comment', portfolioId: 1 };
    return await request(app)
      .post('/api/v1/portfolioComments')
      .send(addComment)
      .then(res => expect(res.body).toEqual({ ...addComment, id: expect.any(String), portfolioId: expect.any(String) }));
  });
});
