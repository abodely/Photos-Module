const Sequelize = require('sequelize');
const sequelize = require('./index.js');

class Home extends Sequelize.Model {}
Home.init({
  id: {
    type: Sequelize.INTEGER,
    // autoIncrement: true,
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

// Home.hasMany(Photo);
Photo.belongsTo(Home, {foreignKey: 'home_id', constraints: false});

module.exports = { Home, Photo };