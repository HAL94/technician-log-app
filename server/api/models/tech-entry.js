const mongoose = require('mongoose');

const techentrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  device: {type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  status: {type: String, required: true, enum: ['COMPLETE', 'PENDING'], default: 'PENDING'}
}, {timestamps: true});

module.exports = mongoose.model('Techentry', techentrySchema);
