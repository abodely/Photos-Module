const sequelize = require('./index.js');
const { Home, Photo } = require('./model.js');

Home.sync({ force: true })
  .then(() => sequelize.query(`COPY homes FROM '/Users/Jia/Documents/SDC/photos_module/postgresdb/homeData.csv' DELIMITER ',' CSV HEADER`))
  .catch(err => console.log(err, 'sync error'));

Photo.sync({ force: true })
  .then(() => sequelize.query(`COPY photos FROM '/Users/Jia/Documents/SDC/photos_module/postgresdb/photosData.csv' DELIMITER ',' CSV HEADER`))
  .catch(err => console.log(err, 'sync error'));