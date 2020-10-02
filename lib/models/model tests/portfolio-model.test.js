const fs = require('fs');
const pool = require('../../utils/pool');
const request = require('supertest');
const app = require('../../app');

describe('networkr routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should test my patience', () => {
    expect(true).toEqual(true);
  });
});
