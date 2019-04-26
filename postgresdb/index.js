const config = require('../config.js');
const Sequelize = require('sequelize');
const pgtools = require('pgtools');
const sequelize = new Sequelize(config.db, config.user, config.password, {
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    pgtools.createdb(config, 'photos', (err, res) => {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      sequelize
        .authenticate()  
        .then(() => {
        console.log('Connection success!');
      })
    });
  });

module.exports = sequelize;