const faker = require('faker');
const fs = require('fs');
const path = require('path');

const urlPrefix = 'https://s3.amazonaws.com/sdc-airbnb-photos/photo';

const getRandomId = () => {
  return Math.floor(Math.random() * 1033 + 1);
}

const createPhotoListings = () => {
  const listing = [];
  for (let i = 1; i < 1500000; i++) {
    let photo = {};
    photo.id = i;
    photo.url = `https://s3.amazonaws.com/sdc-airbnb-photos/photo${getRandomId()}.jpg`;
    photo.comment = faker.lorem.words();
    photo.home_id = Math.floor(Math.random() * 1000 + 1);
    listing.push(photo)
  }
  return listing;
}

const createHomes = () => {
  const homes = [];
  for (let i = 1; i < 100000; i++) {
    let home = {};
    home.id = i;
    homes.push(home);
  }
  return homes;
}

const convertToCSV =  (file) => {
  var csv = "";
  var keys = (file[0] && Object.keys(file[0])) || [];
  csv += keys.join(',') + '\n';
  for (var line of file) {
    csv += keys.map(key => line[key]).join(',') + '\n';
  }
  return csv;
}

const createMockDataFile = () => {
  const homeJSON = createHomes();
  const photosJSON = createPhotoListings();
  const homeCSV = convertToCSV(homeJSON);
  const photosCSV = convertToCSV(photosJSON);
  const file = fs.createWriteStream(path.join(__dirname, 'homeData.csv'));
  
  fs.writeFile(path.join(__dirname, 'homeData.csv'), homeCSV, err => {
    if (err) console.log(err);
    console.log('Successfully inserted homes data!');
  })
  fs.writeFile(path.join(__dirname, 'photosData.csv'), photosCSV, err => {
    if (err) console.log(err);
    console.log('successfully inserted photos data!');
  })
}

createMockDataFile();