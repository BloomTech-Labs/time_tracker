const https = require('https');
const fs = require('fs');
const path = require('path');
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
    newInvoice.save();

    const generateInvoice = (invoice, filename, success, error) => {
      var postData = JSON.stringify(invoice);
      var options = {
        hostname: 'invoice-generator.com',
        port: 443,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      var file = fs.createWriteStream(filename);

      var req = https.request(options, function(res) {
        res
          .on('data', function(chunk) {
            file.write(chunk);
          })
          .on('end', function() {
            file.end();

            if (typeof success === 'function') {
              success();
            }
          });
      });
      req.write(postData);
      req.end();

      if (typeof error === 'function') {
        req.on('error', error);
      }
    };
    const invoice = {
      items: timestamps.map(timestamp => {
        const minutes = timestamp.duration.split(':')[1] / 60 * 100;
        const quantity = `${timestamp.duration.split(':')[0]}.${minutes}`;
        return {
          name: moment(timestamp.startTime).format('MM/DD/YYYY'),
          quantity,
          unit_cost: hourlyRate
        };
      }),
      from: name,
      to: client.name,
      currency: 'usd',
      number: newInvoice._id
    };
    generateInvoice(
      invoice,
      `${newInvoice._id}_invoice.pdf`,
      function() {
        res.sendFile(
          path.join(__dirname, '../', `${newInvoice._id}_invoice.pdf`)
        );
        console.log(
          path.join(__dirname, '../', `${newInvoice._id}_invoice.pdf`)
        );
      },
      function(error) {
        console.error(error);
      }
    );
  });
});

module.exports = invoiceRouter;
