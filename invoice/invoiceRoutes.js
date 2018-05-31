const express = require('express');
const Invoice = require('./invoiceSchema');
const invoiceRouter = express.Router();
const moment = require('moment');
const Client = require('../client/clientSchema');

invoiceRouter.post('/new', (req, res) => {
  const { timestamps, hourlyRate, name } = req.body;
  const vendorNum = timestamps[0].vendor;
  const clientNum = timestamps[0].client;
  Client.findOne({ _id: clientNum }).then(client => {
    const newInvoice = new Invoice({
      clientNum,
      vendorNum
    });
    for (let i = 0; i < timestamps.length; i++) {
      newInvoice.hoursLogged.push(timestamps[i]._id);
    }
    const invoice = {
      items: [
        timestamps.map(timestamp => {
          const minutes = timestamp.duration.split(':')[1] / 60 * 100;
          const quantity = `${timestamp.duration.split(':')[0]}.${minutes}`;
          return {
            name: moment(timestamp.startTime).format('MM/DD/YYYY'),
            quantity,
            unit_cost: hourlyRate
          };
        })
      ],
      from: name,
      to: client.name,
      currency: 'usd'
    };
    console.log(invoice);
    // need to save invoice yet
  });
});

module.exports = invoiceRouter;
