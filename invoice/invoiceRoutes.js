const express = require('express');
const Vendor = require('../vendor/vendorSchema');
const Client = require('../client/clientSchema');
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

//Get all invoices from a user
invoiceRouter.get('/', (req, res) => {
	const { id } = req.userId;
	Invoice.find(id, (err, invoices) => {
		if (err) return res.send(err);
			res.send(invoices);
		});
});

//Get an invoice by id
invoiceRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	Invoice.findById(id)
		.then((invoice) => {
			res.status(200).json(invoice);
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not access DB ${err}` });
		});
})

//Update
invoiceRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	Invoice.findByIdAndUpdate(id, req.body)
		.then((updatedInvoice) => {
			if (updatedInvoice) {
				res.status(200).json(updatedInvoice);
			} else {
				res.status(404).json({ message: `Could not find indvoice with id ${id}` })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while updating invoice: ${err}` });
		});
});

//Remove
invoiceRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	Invoice.findByIdAndRemove(id)
		.then((removedInvoice) => {
			if (removedInvoice) {
				res.status(200).json(removedInvoice);
			} else {
				res.status(404).json({ message: `Could not find invoice with id ${id}` })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while removing invoice: ${err}` })
		});
});

module.exports = invoiceRouter;








