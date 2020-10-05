const pool = require('../utils/pool');
const fs = require('fs');
const seed = require('./seed');
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('https://auth.alchemycodelab.io/login')
    .send({
      email: 'instruction@alchemycodelab.io',
      password: process.env.TEST_PASSWORD
    });
});

module.exports = {
  getAgent: () => agent
};
