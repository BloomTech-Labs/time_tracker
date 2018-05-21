const express = require('express');
const Vendor = require('./vendorSchema');
const Client = require('./clientSchema');
const clientRouter = express.Router();

//Create new client
//TODO encrypt password pre save in the client schema
clientRouter.post('/', (req, res) => {
	const {
		name,
		email,
		password,
	} = req.body;
	if (!name || !password || !email) {
		res.status(422).json({ error: 'Missing a required field(name, email, password)' });
		return;
	}
	const client = new Client(req.body)
	Client.save((err, client) => {
		if (err) return res.send(err);
		res.json({ success: 'User saved', client })
	});
});

//Get all clients from a specific vendor
//using the vendor's email
//TODO modify req.body if necessary to get vendor's email
clientRouter.get('/', (req, res) => {
	const { email } = req.body;
	Vendor.findOne({ email })
		.then((vendor) => {
			const vendorId = vendor.id;
			Client.find({ vendorId }, (err, clients) => {
				if (err) return res.send(err);
				res.send(clients);
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive users: ${err}` });
		});
});

//Login
//TODO Modify password checking after implementing password encryption
clientRouter.post('/login', (req, res) => {
	const { email, password } = req.body;
	Client.findOne({ email }, (err, client) => {
		if (err || !client) {
			res.status(500).json({ error: 'Invalid username or password' });
			return;
		}
		if (email === null) {
			res.status(422).json({ error: 'No user with that email in our DB' });
			return;
		}
		if (password === client.password) {
			res.json({ success: true });
		} else {
			res.status(422).json({ error: 'Invalid username or password' });
		}
	});
});

//Update
clientRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	Client.findByIdAndUpdate(id, req.body)
		.then((updatedClient) => {
			if (updatedClient) {
				res.status(200).json(updatedClient);
			} else {
				res.status(404).json({ message: `Could not find user with id ${id}` });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while updating user: ${err}` });
		});
});

//Remove
clientRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	Client.findByIdAndRemove(id)
		.then((removedClient) => {
			if (removedClient) {
				res.status(200).json(removedClient);
			} else {
				res.status(404).json({ message: `Could not find user with id ${id}` })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while removing user: ${err}` })
		});
});

module.exports = clientRouter;





