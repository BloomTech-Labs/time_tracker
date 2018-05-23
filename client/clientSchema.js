const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const ClientSchema = {
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  contact: { type: String },
  vendors: [{ type: ObjectId, ref: 'Vendor' }],
  invoices: [{ type: ObjectId, ref: 'Invoice' }]
};

module.exports = mongoose.model('Client', ClientSchema);
