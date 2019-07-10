const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerName: String,
  email: String,
  company: String,
  department: String,
  location: String
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);
