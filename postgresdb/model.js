const Sequelize = require('sequelize');
const sequelize = require('./index.js');

class Home extends Sequelize.Model {}
Home.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  }
}, {
  sequelize,
  modelName: 'home',
  timestamps: false
})

class Photo extends Sequelize.Model {}
Photo.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  url: Sequelize.STRING,
  comment: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'photo',
  timestamps: false
})

Home.hasMany(Photo, {constraints: false});
Photo.belongsTo(Home, {constraints: false});

module.exports = { Home, Photo };