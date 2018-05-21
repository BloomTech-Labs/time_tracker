const express = require('express');
const Vendor = require('../vendor/vendorSchema');
const Invoice = require('./invoiceSchema');
const invoiceRouter = express.Router();

//Create new invoice
invoiceRouter.post('/', (req, res) => {
	const invoice = new Invoice(req.body)
	invoice.save((err, invoice) => {
		if (err) return res.send(err);
		res.json({ success: 'Invoice saved', invoice })
	});
});

module.exports = invoiceRouter;





