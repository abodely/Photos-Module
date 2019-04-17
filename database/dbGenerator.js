// const _ = require('lodash');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

const urlPrefix = 'https://s3.amazonaws.com/sdc-airbnb-photos/photo';

const getRandomId = () => {
  return Math.floor(Math.random() * 1033 + 1);
}

const createPhotoAndComment = () => {
  const photo = {};
  photo.comment = faker.lorem.words();
  photo.url = urlPrefix + getRandomId();
  return photo;
}

const createPhotoListings = () => {
  const listing = [];
  for (let i = 1; i < 25; i++) {
    listing.push(createPhotoAndComment())
  }
  return listing;
}

const createHomes = () => {
  const homes = []
  for (let i = 1; i < 1001; i++) {
    let home = {};
    home.id = i;
    home.photos = createPhotoListings();
    homes.push(home);
  }
  return homes;
}

const createMockDataFile = () => {
  const mockData = createHomes();
  fs.writeFile(path.join(__dirname, './mockData.json'), JSON.stringify(mockData), err => {
    if (err) console.log(err);
    console.log('successfully inserted!')
  })
}

createMockDataFile();






// // Function that checks if photo has already been selected
// const photoWasSelected = (urlCategory, selectedPhotosSet) => {
//   // Randomly generate a number between 0 and the amount of photos minus 1
//   const currPhotoIdx = _.random(0, urlCategory.length - 1);
//   // If number exists, already, rerun the function
//   if (selectedPhotosSet.has(currPhotoIdx) === false) {
//     // Return the unique index
//     return currPhotoIdx;
//   }
//   return photoWasSelected(urlCategory, selectedPhotosSet);
// };

// // Function that generates the room id data
// const roomDataGenerator = (minNumPhoto, maxNumPhoto, urlPrefix, urlCategory, currId) => {
//   // Randomly generate number between min to max
//   const numPhotos = _.random(minNumPhoto, maxNumPhoto);
//   const selectedPhotosSet = new Set();
//   // While counter is less than or equal to randomly generated number
//   for (let i = 0; i < numPhotos; i += 1) {
//     // Create an empty object which will be the current data object in creation
//     const roomData = {};
//     // Select category photo that has not yet been used
//     const selectedPhoto = photoWasSelected(urlCategory, selectedPhotosSet);
//     selectedPhotosSet.add(selectedPhoto);
//     const urlCategoryPhoto = urlCategory[selectedPhoto];
//     // Concat urlPrefix and photo url at generated index
//     const photoUrl = urlPrefix + urlCategoryPhoto;
//     // Assign empty object with key as 'imageUrl' and value as that concated text
//     roomData.imageUrl = photoUrl;
//     // Assign object with key as 'comment' and value as randomly generated text
//     roomData.comment = faker.lorem.words();
//     // Push the object to 'photosAndComments' array
//     currId.photosAndComments.push(roomData);
//   }
// };

// // Function that generates all rooms data
// const dbGenerator = () => {
//   // Create array to store the generated objects
//   const db = [];
//   // Iterate from 1 to 100 which will be the id number
//   for (let i = 1; i <= 100; i += 1) {
//     // Create empty object for current room id
//     const currId = {};
//     // Assign key 'id' and the iteration number as value
//     currId.id = i;
//     // Assign key 'photosAndComments' with an empty array
//     currId.photosAndComments = [];
//     // BEDROOM
//     // Randomly generate number between 1 - 2
//     roomDataGenerator(1, 2, imageUrls.urlPrefix, imageUrls.bedroomUrls, currId);
//     // LIVING ROOM
//     // If randomly generated number between 0 - 2
//     roomDataGenerator(0, 2, imageUrls.urlPrefix, imageUrls.livingRoomUrls, currId);
//     // COUNTRY
//     // If id is between 1 to 25
//     if (currId.id >= 1 && currId.id <= 25) {
//       // If randomly generated number between 1 - 4
//       roomDataGenerator(1, 4, imageUrls.urlPrefix, imageUrls.japanUrls, currId);
//     }
//     // If id is between 26 to 50
//     if (currId.id >= 26 && currId.id <= 50) {
//       // If randomly generated number between 1 - 4
//       roomDataGenerator(1, 4, imageUrls.urlPrefix, imageUrls.italyUrls, currId);
//     }
//     // If id is between 51 to 75
//     if (currId.id >= 51 && currId.id <= 75) {
//       // If randomly generated number between 1 - 4
//       roomDataGenerator(1, 4, imageUrls.urlPrefix, imageUrls.usUrls, currId);
//     }
//     // If id is between 76 to 100
//     if (currId.id >= 76 && currId.id <= 100) {
//       // If randomly generated number between 1 - 4
//       roomDataGenerator(1, 4, imageUrls.urlPrefix, imageUrls.singaporeUrls, currId);
//     }
//     // KITCHEN
//     // If randomly generated number betweem 0 - 1
//     roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.kitchenUrls, currId);
//     // BATHROOM
//     // If randomly generated number between 0 - 1
//     roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.bathroomUrls, currId);
//     // OTHERS
//     // If randomly generated number between 0 - 4
//     roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.otherUrls, currId);
//     // Push current room id data to db
//     db.push(currId);
//   }
//   // Return the array
//   return db;
// };

// // console.log(JSON.stringify(dbGenerator()));

// module.exports = {
//   dbGenerator,
//   photoWasSelected,
//   roomDataGenerator,
// };


// // Function that checks if photo has already been selected
// const photoWasSelected = (urlCategory, chosenPhotos) => {
//   // Randomly generate a number between 0 and the amount of photos minus 1
//   const currPhotoIdx = _.random(0, urlCategory.length - 1);
//   // Iterate through the tracker array
//   if (chosenPhotos.length === 0) {
//     return currPhotoIdx;
//   }
//   for (let i = 0; i < chosenPhotos.length; i += 1) {
//     // If number exists, already, rerun the function
//     if (chosenPhotos[i] === currPhotoIdx) {
//       return photoWasSelected(urlCategory, chosenPhotos);
//     }
//   }
//   // Push number into the empty array outside of this functions
//   selectedPhotos.push(currPhotoIdx);
//   return currPhotoIdx;
// };

// // Function that generates the room id data
// const roomDataGenerator = (minNumPhoto, maxNumPhoto, urlPrefix, urlCategory, currId) => {
//   // Create an empty object which will be the current data object in creation
//   let roomData = {};
//   // Randomly generate number between min to max
//   const numPhotos = _.random(minNumPhoto, maxNumPhoto);
//   // While counter is less than or equal to randomly generated number
//   let count = 1;
//   while (count <= numPhotos) {
//     // Create empty array to keep track of image already used
//     const selectedPhotos = [];
//     // Select category photo that has not yet been used
//     const urlCategoryPhoto = urlCategory[photoWasSelected(urlCategory, selectedPhotos)];
//     // Concat urlPrefix and photo url at generated index
//     const photoUrl = urlPrefix + urlCategoryPhoto;
//     // Assign empty object with key as 'imageUrl' and value as that concated text
//     roomData.imageUrl = photoUrl;
//     // Assign object with key as 'comment' and value as randomly generated text
//     roomData.comment = faker.lorem.words();
//     // Push the object to 'photosAndComments' array
//     currId.photosAndComments.push(roomData);
//     // Reset object to be empty
//     roomData = {};
//     // Add one to the counter
//     count += 1;
//   }
// };

// // Function that generates all rooms data
// const dbGenerator = () => {
//   // Create array to store the generated objects
//   const db = [];
//   // Iterate from 1 to 100 which will be the id number
//   for (let i = 1; i <= 100; i += 1) {
//     // Create empty object for current room id
//     const currId = {};
//     // Assign key 'id' and the iteration number as value
//     currId.id = i;
//     // Assign key 'photosAndComments' with an empty array
//     currId.photosAndComments = [];
//     // BEDROOM
//     // Randomly generate number between 1 - 2
//     roomDataGenerator(1, 2, imageUrls.urlPrefix, imageUrls.bedroomUrls, currId);
//     // LIVING ROOM
//     // If randomly generated number between 0 - 2 is greater than 0
//     roomDataGenerator(0, 2, imageUrls.urlPrefix, imageUrls.livingRoomUrls, currId);
//     // COUNTRY
//     // If id is between 1 to 25
//     if (currId.id >= 1 && currId.id <= 25) {
//       // If randomly generated number between 0 - 4 is greater than 0
//       roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.japanUrls, currId);
//     }
//     // If id is between 26 to 50
//     if (currId.id >= 26 && currId.id <= 50) {
//       // If randomly generated number between 0 - 4 is greater than 0
//       roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.italyUrls, currId);
//     }
//     // If id is between 51 to 75
//     if (currId.id >= 51 && currId.id <= 75) {
//       // If randomly generated number between 0 - 4 is greater than 0
//       roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.usUrls, currId);
//     }
//     // If id is between 76 to 100
//     if (currId.id >= 76 && currId.id <= 100) {
//       // If randomly generated number between 0 - 4 is greater than 0
//       roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.singaporeUrls, currId);
//     }
//     // KITCHEN
//     // If randomly generated number betweem 0 - 1 is greater than 0
//     roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.kitchenUrls, currId);
//     // BATHROOM
//     // If randomly generated number between 0 - 1 is greater than 0
//     roomDataGenerator(0, 1, imageUrls.urlPrefix, imageUrls.bathroomUrls, currId);
//     // OTHERS
//     // If randomly generated number between 0 - 4 is greater than 0
//     roomDataGenerator(0, 4, imageUrls.urlPrefix, imageUrls.otherUrls, currId);
//     // Push current room id data to db
//     db.push(currId);
//   }
//   // Return the array
//   return db;
// };
