const express = require('express');
const Vendor = require('../vendor/vendorSchema');
const Client = require('./clientSchema');
const clientRouter = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

//Create new client
//TODO encrypt password pre save in the client schema
clientRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    res
      .status(422)
      .json({ error: 'Missing a required field(name, email, password)' });
    return;
  }
  const client = new Client(req.body);
  client
    .save()
    .then(vendor => {
      res.status(200).json({ success: 'Vendor saved' });
    })
    .catch(err => {
      res.send(err);
    });
});

//Get all clients from a specific vendor
//using the vendor's email
//TODO modify req.body if necessary to get vendor's email
clientRouter.get('/', (req, res) => {
  const { _id } = req.body;
  Client.findOne({ email })
    .then()
    .catch();
});

//Login
//TODO Modify password checking after implementing password encryption
clientRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  Client.findOne({ email })
    .then(client => {
      console.log(client);
      if (client !== null) {
        client.comparePass(password, (err, match) => {
          if (err) {
            res.send(422).json({ err });
          }
          if (match) {
            const payload = {
              email: client.email,
              userId: client._id
            };
            res
              .status(200)
              .json({ token: jwt.sign(payload, secret), _id: client._id });
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
clientRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Client.findByIdAndUpdate(id, req.body)
    .then(updatedClient => {
      if (updatedClient) {
        res.status(200).json(updatedClient);
      } else {
        res.status(404).json({ message: `Could not find user with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while updating user: ${err}` });
    });
});

// @TODO: add changing of email and checking new password to not be the same as old
// @TODO STRETCH: cannot use previous X passwords
// Update client password and revalidate JWT
clientRouter.put('/settings/:id', (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  console.log(id);
  Client.findOne({ _id: id })
    .then(client => {
      client.comparePass(password, (err, match) => {
        if (err) {
          res.status(422).json({ err });
        }
        if (match) {
          client.password = newPassword;
          client.save();
          const payload = {
            email: client.email,
            userId: client._id
          };
          res
            .status(200)
            .json({ token: jwt.sign(payload, secret), _id: client._id });
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
clientRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Client.findByIdAndRemove(id)
    .then(removedClient => {
      if (removedClient) {
        res.status(200).json(removedClient);
      } else {
        res.status(404).json({ message: `Could not find user with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while removing user: ${err}` });
    });
});

module.exports = clientRouter;
