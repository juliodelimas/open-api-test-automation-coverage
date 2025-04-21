const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  it('GET /users should return all users', async () => {
    await request(app).get('/users').expect(200);
  });

  it('GET /users should return all users', async () => {
    await request(app).get('/users').expect(400);
  });

  it('POST /login should authenticate user', async () => {
    await request(app).post('/login')
      .send({ username: 'test', password: 'test' })
      .expect(200);
  });

  it('GET /users/:id should return one user', async () => {
    await request(app).get('/users/123').expect(200);
  });
});
