const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const InvoiceSchema = new Schema({
  hoursLogged: [{ type: ObjectId, ref: 'Timestamp' }],
  paid: { type: Boolean, default: false },
  confirmation: { type: String },
  invoiceNum: { type: String }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
