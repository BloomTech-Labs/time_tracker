const express = require('express');
const Vendor = require('../vendor/vendorSchema');
const Client = require('../client/clientSchema');
const Invoice = require('./invoiceSchema');
const invoiceRouter = express.Router();

//Helper function to get client's invoices
const getClientInv = (clientId) => {
	Client.findOne({ clientId })
		.then((client) => {
			Invoice.find({ clientId }, (err, invoices) => {
				if (err) return res.send(err);
				res.send(invoices);
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive invoices: ${err}` })
		});
};

//Helper function to get vendor's invoices
const getVendorInv = (vendorId) => {
	Vendor.findOne(vendorId)
		.then((vendor) => {
			Invoice.find({ vendorId }, (err, invoices) => {
				if (err) return res.send(err);
				res.send(invoices);
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive invoices: ${err}` })
		});
};

//Create new invoice
invoiceRouter.post('/', (req, res) => {
	const invoice = new Invoice(req.body)
	invoice.save((err, invoice) => {
		if (err) return res.send(err);
		res.json({ success: 'Invoice saved', invoice })
	});
});

//Get all invoices from a vendor or client
invoiceRouter.get('/', (req, res) => {
	const { user } = req.userType;
	if (user === 'client') {
		getClientInv(user.id);
	} else if (user === 'vendor') {
		getVendorInv(user.id);
	} else {
		res.status(422).json({ error: 'User needs to be logged in' });
	}
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








