const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server');

test('GET /api/brews returns an array', async () => {
  const response = await request(app).get('/api/brews');
  assert.equal(response.status, 200);
  assert.equal(Array.isArray(response.body), true);
});

test('POST /api/brews rejects blank fields', async () => {
  const response = await request(app)
    .post('/api/brews')
    .send({ coffee: 'Test', roast: 'Light', method: '', ratio: '1:16', notes: 'Nice', date: '2026-08-07' });

  assert.equal(response.status, 400);
});
