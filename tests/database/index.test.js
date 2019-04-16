const dbIndex = require('../../database/index');


test('Schema should match', () => {
  const schema = [{
    id: { type: Number, unique: true },
    photosAndComments: [
      {
        imageUrl: String,
        comment: String,
      },
    ],
  }];
  expect(dbIndex.photosAndCommentsSchema.obj).toEqual(schema);
});
