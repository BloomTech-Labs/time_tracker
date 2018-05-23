const express = require('express');
const Vendor = require('./vendorSchema');
const Client = require('../client/clientSchema');
const vendorRouter = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

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

//Get all vendors from a specific client
//using the client's email
//TODO modify req.body if necessary to get client's email
vendorRouter.get('/', (req, res) => {
  const { email } = req.body;
  Client.findOne({ email })
    .then(client => {
      const clientId = client.id;
      Vendor.find({ clientId }, (err, vendors) => {
        if (err) return res.send(err);
        res.send(vendors);
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not retreive vendor: ${err}` });
    });
});

//Login
//TODO Modify password checking after implementing password encryption
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

// Add client to vendor array
vendorRouter.put('/client/add', (req, res) => {
  const { _id, email } = req.body;
  console.log(email);
  Vendor.findOne({ _id })
    .then(vendor => {
      if (vendor) {
        Client.findOne({ email })
          .then(client => {
            vendor.clients.push(client._id);
            res.status(200).json(vendor);
          })
          .catch(err => {
            res.status(500).json({ error: 'Error try again' });
          });
      } else {
        res.status(422).json({ error: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error try again' });
    });
});

// Update vendor password and revalidate JWT
vendorRouter.put('/settings/:id', (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  console.log(id);
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
