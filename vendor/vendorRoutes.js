const express = require('express');
const Vendor = require('./vendorSchema');
const Client = require('./clientSchema');
const vendorRouter = express.Router();

//Create new vendor
//TODO encrypt password pre save in the vendor schema
vendorRouter.post('/', (req, res) => {
	const {
		name,
		email,
		password,
		paid
	} = req.body;
	const vendor = new Vendor({
		name,
		email,
		password,
		paid
	})
	vendor.save((err, vendor) => {
		if (err) return res.send(err);
		res.json({ success: 'Vendor saved', vendor })
	});
});

//Get all vendors from a specific client
//using the client's email
//TODO modify req.body if necessary to get client's email
vendorRouter.get('/', (req, res) => {
	const { email } = req.body;
	Client.findOne({ email })
		.then((client) => {
			const clientId = client.id;
			Vendor.find({ clientId }, (err, vendors) => {
				if (err) return res.send(err);
				res.send(vendors);
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive vendor: ${err}` });
		});
});

//TODO Modify password checking after implementing password encryption
vendorRouter.post('/login', (req, res) => {
	const { email, password } = req.body;
	Vendor.findOne({ email }, (err, vendor) => {
		if (err || !vendor) {
			res.status(500).json({ error: 'Invalid username or password' });
			return;
		}
		if (email === null) {
			res.status(422).json({ error: 'No user with that email in our DB' });
			return;
		}
		if (password === vendor.password) {
			res.json({ success: true });
		} else {
			res.status(422).json({ error: 'Invalid username or password' });
		}
	});
});

module.exports = vendorRouter;





