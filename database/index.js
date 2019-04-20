const password = require('../config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('', 'jfeng', password, {
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class Home extends Sequelize.Model {}
Home.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  }
}, {
  sequelize,
  modelName: 'home'
})

class Photo extends Sequelize.Model {}
Photo.init({
  url: Sequelize.STRING,
  comment: Sequelize.STRING,
  home_id: Sequelize.INTEGER
}, {
  sequelize,
  modelName: 'photo'
})

Home.hasMany(Photo);
Photo.belongsTo(Home, {foreignKey: 'home_id'});

Home.sync({ force: true });
Photo.sync({ force: true });

module.exports = { Home, Photo };