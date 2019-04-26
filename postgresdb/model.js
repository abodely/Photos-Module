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
  home_id: Sequelize.INTEGER
}, {
  indexes:[
    {
      unique: false,
      fields:['home_id']
    }
  ],
  sequelize,
  modelName: 'photo',
  timestamps: false
})

Home.hasMany(Photo, {constraints: false});
Photo.belongsTo(Home, {foreignKey: 'home_id', constraints: false});

module.exports = { Home, Photo };