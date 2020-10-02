const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const PortfolioProject = require('../lib/models/portfolio-model');

describe('networkr routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

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

    return await request(app)
      .get('/api/v1/portfolioProjects')
      .then(res => expect(res.body).toEqual(expect.arrayContaining([{ ...addProject, date: expect.stringContaining('2020-10-02') }])));

  });
});
