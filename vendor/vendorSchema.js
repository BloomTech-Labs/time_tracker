const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

VendorSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, function(err, hash) {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('Vendor', VendorSchema);
