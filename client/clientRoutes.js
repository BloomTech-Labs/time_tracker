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
  const { email } = req.body;
  Vendor.findOne({ email })
    .then(vendor => {
      const vendorId = vendor.id;
      Client.find({ vendorId }, (err, clients) => {
        if (err) return res.send(err);
        res.send(clients);
      });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not retreive users: ${err}` });
    });
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
