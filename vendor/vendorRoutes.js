const express = require('express');
const Vendor = require('./vendorSchema');
const Client = require('../client/clientSchema');
const vendorRouter = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Create new vendor
//TODO encrypt password pre save in the vendor schema
vendorRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    res
      .status(422)
      .json({ error: 'Missing a required field(name, email, password)' });
    return;
  }
  const vendor = new Vendor(req.body);
  vendor
    .save()
    .then(vendor => {
      res.status(200).json({ success: 'Vendor saved' });
    })
    .catch(err => {
      res.send(err);
    });
});

// Get all user info using id. populate client array
vendorRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Vendor.findOne({ _id: id })
    .populate('clients', { password: 0, invoices: 0 })
    .populate('hoursLogged')
    .then(vendor => {
      res.status(200).json(vendor);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

vendorRouter.get('/client/:id', (req, res) => {
  const { id } = req.params;
  Client.findOne({ _id: id }, { name: 1, hoursLogged: 1, invoices: 1})
    .populate('hoursLogged')
    .then(client => {
      res.status(200).json(client);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Login
vendorRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  Vendor.findOne({ email })
    .then(vendor => {
      if (vendor !== null) {
        vendor.comparePass(password, (err, match) => {
          if (err) {
            res.status(422).json({ err });
          }
          if (match) {
            const payload = {
              email: vendor.email,
              userId: vendor._id
            };
            res
              .status(200)
              .json({ token: jwt.sign(payload, secret), _id: vendor._id });
          } else {
            res.status(422).json({ error: 'email or password is not correct' });
          }
        });
      } else {
        res.status(422).json({ error: 'email or password is not correct' });
      }
    })
    .catch(err => {
      res.status(500);
    });
});

//Update
vendorRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Vendor.findByIdAndUpdate(id, req.body)
    .then(updatedVendor => {
      if (updatedVendor) {
        res.status(200).json(updatedVendor);
      } else {
        res
          .status(404)
          .json({ message: `Could not find vendor with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while updating vendor: ${err}` });
    });
});


// @TODO send email to new client, and check dups
// Add client to vendor array and populate client info array
// @TODO should the vendor id also be set into client vendor list.
vendorRouter.put('/client/add', (req, res) => {
  const { _id, email } = req.body;
  Client.findOne({ email })
    .then(client => {
      // if client !== null
      Vendor.findOneAndUpdate({ _id }, { $push: { clients: client._id } })
        .populate('clients', { password: 0, invoices: 0 })
        .then(vendor => {
          const msg = { // @TODO Create email template for adding clients
            to: `${email}`,
            from: 'cs6timetracker@gmail.com',
            subject: 'Someone has added you to their client list',
            text: 'Click the link to sign in or register for an account to see the connection.',
            html: '<a href="https://ls-time-tracker.herokuapp.com/" />'
          };
          sgMail.send(msg);
          res.status(200).json(vendor);
        });
      // else create client and email
    })
    .catch(err => {
      res.status(500).json({ error: 'Error try again' });
    });
});

// @TODO: add changing of email and checking new password to not be the same as old
// @TODO STRETCH: cannot use previous X passwords
// Update vendor password and revalidate JWT
vendorRouter.put('/settings/:id', (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  Vendor.findOne({ _id: id })
    .then(vendor => {
      vendor.comparePass(password, (err, match) => {
        if (err) {
          res.status(422).json({ err });
        }
        if (match) {
          vendor.password = newPassword;
          vendor.save();
          const payload = {
            email: vendor.email,
            userId: vendor._id
          };
          res
            .status(200)
            .json({ token: jwt.sign(payload, secret), _id: vendor._id });
        } else {
          res.status(422).json({ error: 'email or password is not correct' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//Remove
vendorRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Vendor.findByIdAndRemove(id)
    .then(removedVendor => {
      if (removedVendor) {
        res.status(200).json(removedVendor);
      } else {
        res
          .status(404)
          .json({ message: `Could not find vendor with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while removing vendor: ${err}` });
    });
});

module.exports = vendorRouter;
