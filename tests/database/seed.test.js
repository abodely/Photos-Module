const dbIndex = require('../../database/index');
const seedDb = require('../../database/seed');


beforeAll(() => {
  seedDb.seedDb();
});

afterAll(() => {
  dbIndex.photosAndComments.collection.drop();
});

test('Should create a database', () => {
  expect(dbIndex.photosAndComments.find()).toBeTruthy();
});
