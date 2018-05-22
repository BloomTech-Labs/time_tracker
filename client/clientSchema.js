const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const ClientSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  vendors: [{ type: ObjectId, ref: 'Vendor' }],
  invoices: [{ type: ObjectId, ref: 'Invoice' }]
};

module.exports = mongoose.model('Client', ClientSchema);
