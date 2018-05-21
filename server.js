const express = require('express');
const mongoose = require('mongoose');
const vendorRouter = require('./vendor/vendorRoutes');

const server = express();
server.use('/vendor', vendorRouter);
server.use('/client', clientRouter);

mongoose
  .connect('mongodb://admin:temp@ds231090.mlab.com:31090/labs_time_tracker')
  .then(success => {
    server.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('ERROR CONNECTING TO MLAB');
  });
