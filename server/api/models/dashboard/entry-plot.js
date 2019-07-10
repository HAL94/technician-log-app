const mongoose = require('mongoose');

const entryPlotSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  y: {type: Number, required: true},
  date: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
}, {timestamps: true});

const EntryPlotPending = mongoose.model('EntryPlotPending', entryPlotSchema);
const EntryPlotCompleted = mongoose.model('EntryPlotCompletion', entryPlotSchema);

module.exports = {EntryPlotCompleted: EntryPlotCompleted, EntryPlotPending: EntryPlotPending};
