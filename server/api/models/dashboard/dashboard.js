const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  totalPending: {type: Number, required: true},
  totalCompleted: {type: Number, required: true},
  monthlyTarget: {type: Number, required: true, default: 100},
  monthlyTargetReached: {type: Number, required: true},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
  totalTasks: {type: Number, required: true},
  plot: {
    completedPlot: [{type: mongoose.Schema.Types.ObjectId, ref: 'EntryPlotCompletion'}],
    pendingPlot: [{type: mongoose.Schema.Types.ObjectId, ref: 'EntryPlotPending'}]
  },
  weeklyEntries: [
    {
      count_complete: Number,
      count_pending: Number,
      status: String,
      day: Number
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Dashboard', dashboardSchema);
