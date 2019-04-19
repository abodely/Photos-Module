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

// const mongoose = require('mongoose');
// const { DBUSER, DBPW } = require('./dbAccessKey');


// const db = mongoose.connect(`mongodb://${DBUSER}:${DBPW}@localhost/photosAndComments`, { useNewUrlParser: true });
// // const db = mongoose.connect('mongodb://172.17.0.2/photosAndComments', { useNewUrlParser: true, useCreateIndex: true });

// const photosAndCommentsSchema = mongoose.Schema([
//   {
//     id: { type: Number, unique: true },
//     photosAndComments: [
//       {
//         url: String,
//         comment: String,
//       },
//     ],
//   },
// ]);

// const photosAndComments = mongoose.model('photosAndComments', photosAndCommentsSchema);


// module.exports = {
//   photosAndComments,
//   db,
//   photosAndCommentsSchema,
// };
