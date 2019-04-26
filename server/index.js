const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const PORT = 3001;
const sequelize = require('../postgresdb/index');
const { Home, Photo } = require('../postgresdb/model');

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/home/:homeid/photos', express.static(path.join(__dirname, '../public')));


app.get('/api/home/:homeid/photos', (req, res) => {
  console.time('start')
    Photo.findAll({
      where: {'home_id': JSON.parse(req.params.homeid)}
    })
    .then(data => {
      const photos = [];
      data.map(photo => photos.push(photo.dataValues))
      res.json(photos)
      console.timeEnd('start')})
  // console.time('response time: ')
  // let getQuery = `SELECT * FROM photos WHERE home_id = ${req.params.homeid};`;
  // sequelize.query(getQuery, { type: sequelize.QueryTypes.SELECT })
  //   .then(data => {
  //   res.json(data); 
  //   console.timeEnd('response time: ')
  // })
});
  


// app.post('/api/home/:homeid/photos/add', (req, res) => {
//   index.photosAndComments.save({ id: parseInt(req.params.id, 10) }, { _id: 0 })
//     .select('photosAndComments')
//     .exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//       }
//     });
// });

// app.updateOne('/api/home/:homeid/photos/update', (req, res) => {
//   index.photosAndComments.updateOne({ id: parseInt(req.params.id, 10) }, { _id: 0 })
//     .select('photosAndComments')
//     .exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//       }
//     });
// });

// app.delete('/api/home/:homeid/photos/delete', (req, res) => {
//   index.photosAndComments.deleteOne({ id: parseInt(req.params.id, 10) }, { _id: 0 })
//     .select('photosAndComments')
//     .exec((err, data) => {
//       if (err) {
//         console.log('ERROR finding data from db: ', err);
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//       }
//     });
// });

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


module.exports = {
  app,
  PORT,
};