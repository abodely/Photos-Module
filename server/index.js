const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const PORT = 3001;
const sequelize = require('../postgresdb/index');
const { Photo } = require('../postgresdb/model');

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/home/:homeid/photos', express.static(path.join(__dirname, '../public')));

app.get('/api/home/:homeid/photos', (req, res) => {
  sequelize.query(`SELECT * FROM photos WHERE home_id = ${req.params.homeid};`, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
    res.json(data); 
  });
});

app.post('/api/home/:homeid/photos', (req, res) => {
  let newPhoto = new Photo();
  newPhoto.id = req.params.id,
  newPhoto.url = req.params.url,
  newPhoto.comment = req.params.comment,
  newPhoto.home_id = req.params.homeid
  newPhoto.save();
  res.status(200).send('Successfully sent!')
});

app.put('/api/home/:homeid/photos', (req, res) => {

});

app.delete('/api/home/:homeid/photos', (req, res) => {
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


module.exports = {
  app,
  PORT,
};