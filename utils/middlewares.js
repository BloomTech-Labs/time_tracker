const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');

const authenticate = (req, res, next) => {
	const { token, userType } = req.body;
	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) return res.status(422).json(err);
			if (userType === 'client') {
				Client.findOne({ _id: decoded.userId })
					.then((client) => {
						if (client) {
							next();
						} else {
							return res.status(422).json({ error: 'Not a valid token' });
						}
					})
					.catch((err) => {
						return res.status(422).send(err);
					});
			}
			Vendor.findOne({ _id: decoded.userId })
				.then((vendor) => {
					if (vendor) {
						next();
					} else {
						return res.status(422).json({ error: 'Not a valid token' });
					}
				})
				.catch((err) => {
					return res.status(422).send(err);
				});
		});
	}
}

module.exports = { authenticate };
