const pool = require('../utils/pool');
const fs = require('fs');
const seed = require('./seed');

jest.mock('@alchemycodelab/auth-middleware', () => ({
  authMiddleware:(req, res, next) => {
    req.user = {
      id:'1',
      email: 'instruction@alchemycodelab.io',
      role: 'ADMIN'
    };
    next();
  } 
}));

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});

