const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const VendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paid: { type: Boolean, required: true, default: false },
  hoursLogged: [{ type: ObjectId, ref: 'timestamp' }],
  clients: [{ type: ObjectId, ref: 'Client' }],
  invoices: [{ type: ObjectId, ref: 'Invoice' }]
});

module.exports = mongoose.model('Vendor', VendorSchema);
