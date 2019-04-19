const mockData = require('./mockData.json');
const { Home, Photo } = require('./index.js');

Home.sync({ force: true });
Photo.sync({ force: true });