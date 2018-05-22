const express = require('express');
const Timestamp = require('./timestampSchema');
const timestampRouter = express.Router();

//Create new timestamp
timestampRouter.post('/', (req, res) => {
	const timestamp = new Timestamp(req.body)
	timestamp.save((err, timestamp) => {
		if (err) return res.send(err);
		res.json({ success: 'Timestamp saved', timestamp });
	});
});

//Get all timestamps
timestampRouter.get('/', (req, res) => {
	const { id } = req.id;
	Timestamp.find(id, (err, timestamps) => {
		if (err) return res.send(err);
			res.send(timestamps);
		});
});

//Get an timestamp by id
timestampRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	Timestamp.findById(id)
		.then((timestamp) => {
			res.status(200).json(timestamp);
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not access DB ${err}` });
		});
})

//Update
timestampRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	Timestamp.findByIdAndUpdate(id, req.body)
		.then((updatedTimestamp) => {
			if (updatedTimestamp) {
				res.status(200).json(updatedTimestamp);
			} else {
				res.status(404).json({ message: `Could not find timestamp with id ${id}` })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while updating timestamp: ${err}` });
		});
});

//Remove
timestampRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	Timestamp.findByIdAndRemove(id)
		.then((removedTimestamp) => {
			if (removedTimestamp) {
				res.status(200).json(removedTimestamp);
			} else {
				res.status(404).json({ message: `Could not find timestamp with id ${id}` })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while removing timestamp: ${err}` })
		});
});

module.exports = timestampRouter;








