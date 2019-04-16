const dbGenerator = require('../../database/dbGenerator');
const imageUrls = require('../../database/imageUrls');


describe('photoIdx function', () => {
  test('Should return a number', () => {
    expect(typeof dbGenerator.photoIdx(imageUrls.bedroomUrls, [])).toBe('number');
    expect(typeof dbGenerator.photoIdx(imageUrls.bathroomUrls, [])).toBe('number');
  });
});

describe('dbGenerator function', () => {
  test('Should generate an array of 100 elements', () => {
    expect(dbGenerator.dbGenerator().length).toBe(100);
  });
});


// test('Should recursively check', () => {
//   const mockFunc = jest.spyOn(dbGenerator, 'photoIdx');
//   const selectedPhotos = [
//     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
//   ];
//   dbGenerator.photoIdx(imageUrls.livingRoomUrls, selectedPhotos);

//   expect(mockFunc).toHaveBeenCalled();

//   mockFunc.mockRestore();
// });
