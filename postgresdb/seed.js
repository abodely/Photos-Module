const sequelize = require('./index.js');
const { Home, Photo } = require('./model.js');

Home.sync({ force: true })
  .then(() => sequelize.query(`COPY homes FROM '/Users/jfeng/Documents/SDC/photos_module/database/homeData.csv' DELIMITER ',' CSV HEADER`))
  .catch(err => console.log(err, 'sync error'));

Photo.sync({ force: true })
  .then(() => sequelize.query(`COPY photos FROM '/Users/jfeng/Documents/SDC/photos_module/database/photosData.csv' DELIMITER ',' CSV HEADER`))
  .catch(err => console.log(err, 'sync error'));