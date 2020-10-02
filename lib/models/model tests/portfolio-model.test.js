const fs = require('fs');
const pool = require('../../utils/pool');
const request = require('supertest');
const app = require('../../app');
const Portfolio = require('../portfolio-model');

describe('networkr routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should test my patience', async() => {
    const portfolio = await Portfolio.insert({ title: 'title', primaryLanguage: 'js', date: '2020-10-02', githubLink: 'google.com', description: 'this is my project', collaborators: ['ben, edgar, adrian'], open: true });

    expect(true).toEqual(true);
  });
});
