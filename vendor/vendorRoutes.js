const express = require('express');
const Vendor = require('./vendorSchema');
const vendorRouter = express.Router();

vendorRouter.get('/', (req, res) => {
  res.send('Vendor base get route');
});

module.exports = vendorRouter;
