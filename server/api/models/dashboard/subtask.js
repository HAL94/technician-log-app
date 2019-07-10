const mongoose = require('mongoose');

const subtaskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true},
  date: {type: Date},
  details: {type: String},
  status: {type: String, required: true, enum: ['COMPLETE', 'PENDING'], default: 'PENDING'}
}, {timestamps: true});

module.exports = mongoose.model('Subtask', subtaskSchema);
