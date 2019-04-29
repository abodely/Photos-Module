const nr = require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const sequelize = require('../postgresdb/index');
const { Photo } = require('../postgresdb/model');
const compression = require('compression');
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();

app.use(compression());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/home/:homeid/photos', express.static(path.join(__dirname, '../public')));

const findPhotos = (req, res) => {
  sequelize.query(`SELECT * FROM photos WHERE home_id = ${req.params.homeid};`, { type: sequelize.QueryTypes.SELECT })
  .then(data => {
    client.setex(req.params.homeid, 3600, JSON.stringify(data));
    res.json(data);
  });
} 

const getCache = (req, res) => {
  let homeid = req.params.homeid;
  client.get(homeid, (err, result) => {
    if (result) {
      res.json(result);
    } else {
      findPhotos(req, res);
    }
  });
}

app.get('/api/home/:homeid/photos', getCache);

app.post('/api/home/:homeid/photos', (req, res) => {
  let newPhoto = new Photo();
  newPhoto.id = req.body.id,
  newPhoto.url = req.body.url,
  newPhoto.comment = req.body.comment,
  newPhoto.home_id = req.params.homeid
  newPhoto.save();
  res.status(200).send('Successfully sent!')
});

app.put('/api/home/:homeid/photos', (req, res) => {
  Photo.update({
    id: req.body.id,
    url: req.body.url,
    comment: req.body.comment,
    home_id: req.params.homeid
  }, {
    where: req.params.homeid
  })
  .then(() => res.send('Updated!'))
});

app.delete('/api/home/:homeid/photos', (req, res) => {
  Photo.destroy({
    where: req.params.homeid
  })
  .then(() => res.send('Deleted!'))
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});