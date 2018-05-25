const express = require('express');
const Timestamp = require('./timestampSchema');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');
const timestampRouter = express.Router();

timestampRouter.post('/start', (req, res) => {
  // client id vendor id
  const { vendorId, clientId } = req.body;
  if (vendorId && clientId) {
    const newTStamp = new Timestamp({
      client: clientId,
      vendor: vendorId,
      startTime: new Date()
    });
    newTStamp.save();
    Vendor.findOneAndUpdate(
      { _id: vendorId },
      { $push: { hoursLogged: newTStamp._id } },
      { new: true }
    ).then(vendor => {
      res.status(200).json(newTStamp);
    });
    Client.findOneAndUpdate(
      { _id: clientId },
      { $push: { hoursLogged: newTStamp._id } }
    );
    // push this id to vendor timestamp array
  } else {
    res.status(422).json({ error: 'must include vendorId and clientId' });
  }
});

// stop timer using timestamp id and push to clients hourslogged
timestampRouter.put('/stop', (req, res) => {
  const { timestampId } = req.body;

  Timestamp.findOneAndUpdate(
    { _id: timestampId },
    { endTime: new Date(), active: false }
  )
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Create new timestamp
timestampRouter.post('/', (req, res) => {
  const timestamp = new Timestamp(req.body);
  timestamp.save((err, timestamp) => {
    if (err) return res.send(err);
    res.json({ success: 'Timestamp saved', timestamp });
  });
});

//Get an timestamp by id
timestampRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findById(id)
    .populate('client')
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not access DB ${err}` });
    });
});

//Update timestamp
timestampRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { newTimestamp } = req.body;

  // moment add hours minutes to start and use that timestamp for endTime
  console.log(newTimestamp);
  Timestamp.findOneAndUpdate(
    { _id: id },
    {
      endTime: newTimestamp.endTime,
      comments: newTimestamp.comments
    },
    { new: true }
  )
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Remove
timestampRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findByIdAndRemove(id)
    .then(removedTimestamp => {
      if (removedTimestamp) {
        res.status(200).json(removedTimestamp);
      } else {
        res
          .status(404)
          .json({ message: `Could not find timestamp with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while removing timestamp: ${err}` });
    });
});

module.exports = timestampRouter;
