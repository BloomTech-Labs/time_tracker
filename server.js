const express = require('express');
const mongoose = require('mongoose');
const vendorRouter = require('./vendor/vendorRoutes');
const clientRouter = require('./client/clientRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use('/vendor', vendorRouter);
server.use('/client', clientRouter);

server.use(express.static(path.join(__dirname, 'frontend/build')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

mongoose
  .connect('mongodb://admin:temp@ds231090.mlab.com:31090/labs_time_tracker')
  .then(success => {
    server.listen(PORT, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('ERROR CONNECTING TO MLAB');
  });
