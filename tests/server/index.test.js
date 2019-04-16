const request = require('supertest');
const serverIndex = require('../../server/index');


test('Should response to GET', () => request(serverIndex.app)
  .get('/photosandcomments/:id')
  .then((response) => {
    expect(response.statusCode).toBe(200);
  }));
