const mongoose = require('mongoose');

const Dashboard = require('../../models/dashboard/dashboard');
const Techentry = require('../../models/tech-entry');
const Task = require('../../models/dashboard/task');
require('../../models/dashboard/entry-plot');

exports.get_dashboard = async (req, res, next) => {
  try {
    // await get_dashboard_entry_plots(req.userData._id);
    const weeklyEntries = await get_weekly_entries_count(req.userData._id);
    const totalTasks = await Task.countDocuments({user: req.userData._id}).exec();

    const result = await Dashboard.findOne({user: req.userData._id})
      .populate('plot.completedPlot', '_id user y date')
      .populate('plot.pendingPlot', '_id user y date')
      .select('_id user totalPending totalCompleted monthlyTarget monthlyTargetReached tasks recentEntries plot')
      .exec();


    result.weeklyEntries = weeklyEntries;
    result.totalTasks = totalTasks;

    let taskOptions = {
      path: 'tasks',
      select: '_id title date details subtasks user status createdAt',
      options: { sort: { 'createdAt': -1 }, skip: 0, limit: 3}
    };
    let subtasksOptions = {
      path: 'tasks.subtasks',
      model: 'Subtask',
      select: '_id title parent date details status'
    };

    Dashboard.populate(result, [taskOptions], (error, docs) => {
      if (error) {
        throw error;
      }
      Dashboard.populate(docs,[ subtasksOptions ], (error, dashboard) => {
        if (error) {
          throw error;
        }
        // console.log(dashboard);
        res.status(200).json({
          dashboard: {
            id: dashboard._id,
            userId: dashboard.user,
            totalPending: dashboard.totalPending,
            totalCompleted: dashboard.totalCompleted,
            monthlyTargetReached: dashboard.monthlyTargetReached,
            monthlyTarget: dashboard.monthlyTarget,
            tasks: dashboard.tasks.map(t => {
              return {
                id: t._id,
                title: t.title,
                user: t.user,
                date: t.date,
                details: t.details,
                subtasks: t.subtasks.map(st => {
                  return {
                    id: st._id,
                    status: st.status,
                    parent: st.parent,
                    title: st.title,
                    date: st.date,
                    details: st.details
                  };
                }),
                status: t.status
              };
            }),
            totalTasks: dashboard.totalTasks,
            plot: dashboard.plot,
            weeklyEntries: dashboard.weeklyEntries
          }
        });
      });
    });
  } catch(e) {
    console.log(e);
    res.status(500).json({status: 500, message: 'Failed Retrieving Dashboard'});
  }
};

exports.set_dashboard = async (userId) => {
  try {

    const pending = 0;
    const completed = 0;
    const monthlyTargetReached = 0;
    const taskList = [];
    const totalTasks = 0;
    const plot = { completedPlot: [], pendingPlot: [] };
    const weeklyEntries = [];

    const dashboard = new Dashboard({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      totalPending: pending,
      totalCompleted: completed,
      monthlyTargetReached: monthlyTargetReached,
      tasks: taskList,
      totalTasks: totalTasks,
      plot: plot,
      weeklyEntries: weeklyEntries
    });

    return await dashboard.save();
    // res.status(200).json({dashboard: result, message: 'dashboard created successfully'});

  } catch(e) {
    console.log(e);
  }

};

exports.update_dashboard_tasks = async (userId, taskId, operator) => {
  try {
    if (operator === "$push") {
      return await Dashboard.updateOne({user: userId}, {$push: {tasks: taskId}}).exec()
    } else if (operator === '$pull') {
      return await Dashboard.updateOne({user: userId}, {$pull: {tasks: {$in: [taskId]}}}).exec()
    }
  } catch (error) {
    console.log(error);
  }

}

exports.update_entry_plot = async (userId, entryStatus, entryCreatedAt, operator) => {
  try {
    const status = entryStatus;
    const EntryPlotPending = mongoose.model('EntryPlotPending');
    const EntryPlotCompletion = mongoose.model('EntryPlotCompletion');

    let createdAt = new Date(entryCreatedAt);
    createdAt.setUTCHours(0,0,0);
    createdAt.setMilliseconds(0);

    let nextDay = new Date();
    nextDay.setUTCHours(0,0,0);
    nextDay.setMilliseconds(0);
    nextDay.setDate(createdAt.getDate()+1);

    const pendingEntryPlot = await EntryPlotPending.findOne({date: {$gte: createdAt, $lt: nextDay}}).exec();
    const completeEntryPlot = await EntryPlotCompletion.findOne({date: {$gte: createdAt, $lt: nextDay}}).exec();

    if (operator === '$create') {

      if (!pendingEntryPlot || typeof pendingEntryPlot === 'undefined') {
        const newPendingEntryPlot = new EntryPlotPending({
          _id: new mongoose.Types.ObjectId(),
          user: userId,
          date: createdAt,
          y: 1
        });
        await newPendingEntryPlot.save();
        return await Dashboard.updateOne({user: userId}, {$push: {'plot.pendingPlot': newPendingEntryPlot._id}}).exec();
      } else {

        return await EntryPlotPending.updateOne({_id: pendingEntryPlot._id}, {$inc: {y: 1}}).exec();
      }

    } else if (operator === '$edit') {
      if (status === 'COMPLETE') {

        if (!completeEntryPlot || typeof completeEntryPlot === 'undefined') {
          const newCompleteEntryPlot = new EntryPlotCompletion({
            _id: new mongoose.Types.ObjectId(),
            user: userId,
            date: createdAt,
            y: 1
          });
          await newCompleteEntryPlot.save();
          await Dashboard.updateOne({user: userId}, {$push: {'plot.completedPlot': newCompleteEntryPlot._id}}).exec();
        } else {
          await EntryPlotCompletion.updateOne({date: {$gte: createdAt, $lt: nextDay}}, {$inc: {y: 1}}).exec();
        }
        if (pendingEntryPlot.y >= 1) {
          return await EntryPlotPending.updateOne({date: {$gte: createdAt, $lt: nextDay}}, {$inc: {y: -1}}).exec();
        }

      }
    } else if (operator === '$delete') {
      if (status === 'COMPLETE') {
        return await EntryPlotCompletion.updateOne({date: {$gte: createdAt, $lt: nextDay}}, {$inc: {y: -1}}).exec();
      } else if (status === 'PENDING') {
        return await EntryPlotPending.updateOne({date: {$gte: createdAt, $lt: nextDay}}, {$inc: {y: -1}}).exec();
      }
    }
  } catch (error) {
    console.log(error);
  }

}

exports.update_dashboard_techentries_status = (userId, status, operator) => {
  try {
    if (operator === '$create') {
      return Dashboard.updateOne({user: userId}, {$inc: {totalPending: 1}}).exec();
    } else if (operator === '$edit') {
      return Dashboard
      .updateOne({user: userId},
        {$inc: {totalCompleted: 1, totalPending: -1}}).exec();

    } else if (operator === '$delete') {
      if (status === 'PENDING') {
        return Dashboard.updateOne({user: userId}, {$inc: {totalPending: -1}}).exec();
      } else if (status === 'COMPLETE') {
        return Dashboard.updateOne({user: userId}, {$inc: {totalCompleted: -1}}).exec();
      }
    }
  } catch (error) {
    console.log(error);
  }

};

exports.update_dashboard_monthly_reached = (userId, createdAt, status, operator) => {
  try {
    if (operator === '$edit' && status === 'COMPLETE') {
      return Dashboard
      .updateOne({user: userId}, {$inc: {monthlyTargetReached: 1}}).exec();
    }

    if (operator === '$delete' && status === 'COMPLETE') {
      return Dashboard
      .updateOne({user: userId}, {$inc: {monthlyTargetReached: -1}}).exec();
    }
  } catch (error) {
    console.log(error);
  }
};

async function get_weekly_entries_count(userId) {
  try {
    const DAYS = [
      {key: 1, value: 'SUNDAY'},
      {key: 2, value: 'MONDAY'},
      {key: 3, value: 'TUESDAY'},
      {key: 4, value: 'WEDNESDAY'},
      {key: 5, value: 'THURSDAY'},
      {key: 6, value: 'FRIDAY'},
      {key: 7, value: 'SATURDAY'}
    ];
    const today = new Date();
    const start = new Date();
    const end = new Date();
    let weekStart = 1;
    let weekEnd = 5;

    const backToWeekStart = DAYS[today.getDay()].key - 1;

    start.setDate(today.getDate() - backToWeekStart);

    start.setUTCHours(0,0,0);
    start.setMilliseconds(0);

    /**
     *
      Optional, to be used if user wishes to set the days
      for which data will be displayed between weekStart and weekEnd

      weekStart = start.getDay()+1;
      weekEnd = end.getDay()+1;

    */

    end.setDate(today.getDate()+1);
    end.setUTCHours(0,0,0);
    end.setMilliseconds(0);

    const uid = new mongoose.Types.ObjectId(userId);

    const weeklyEntries = await Techentry.aggregate([
      {$match: {user: uid, createdAt: {$gte: start, $lt: end}}},
      {$group: {_id: {day: {$dayOfMonth: "$createdAt"}, month: {$month: "$createdAt"}, year: {$year: "$createdAt"}},
       count_complete: {$sum: { $switch: { "branches": [ { "case": { $eq: [ "$status", 'COMPLETE' ] }, "then": 1 } ], "default": 0 }  }},
       count_pending: {$sum: { $switch: { "branches": [ { "case": { $eq: [ "$status", 'PENDING' ] }, "then": 1 } ], "default": 0 }  }},
       date: {$first: "$createdAt"}}},
      {$project: {count_complete: 1, count_pending: 1, day: {$dayOfWeek: "$date"},
      _id: 0, status: {$cond: [{$gte: ["$count_complete", "$count_pending"]}, 'COMPLETE', 'PENDING']}}},
      {$match: {day: {$gte: weekStart, $lte: weekEnd}}},
      {$sort: {day: 1}}
    ]);

    return weeklyEntries;
  } catch (error) {
    console.log(error);
  }

}
