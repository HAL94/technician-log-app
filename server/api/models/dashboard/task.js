const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: {type: Date},
  details: {type: String},
  subtasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subtask'}],
  status: {type: String, required: true, enum: ['COMPLETE', 'PENDING'], default: 'PENDING'},
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
