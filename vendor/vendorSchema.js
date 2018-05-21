const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paid: { type: Boolean, required: true, default: false }
});

module.export = mongoose.model('Vendor', VendorSchema);
