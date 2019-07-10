
const Subtask = require('../../models/dashboard/subtask');
const Task = require('../../models/dashboard/task');

exports.edit_subtask = async (req, res, next) => {
  try {
    const stid = req.params.stid;

    const subtask = await Subtask.findById(stid).exec();

    const newSubtask = new Subtask({
      _id: stid,
      title: req.body.title,
      parent: req.body.parent,
      date: req.body.date,
      details: req.body.details,
      status: req.body.status
    });

    await Subtask.updateOne({_id: stid}, {$set: newSubtask})
    .exec();

    return res.status(200).json({
      newSubtask: {
        id: newSubtask._id,
        title: newSubtask.title,
        parent: newSubtask.parent,
        date: newSubtask.date,
        details: newSubtask.details,
        status: newSubtask.status
      }
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500,
      message: 'Failed Editing Subtask'});
  }
};

exports.delete_subtask = async (req, res, next) => {
  try {
    const stid = req.params.stid;
    const subtask = await Subtask.findById(stid).exec();

    const parent = subtask.parent;

    const updateResult = await Promise.all([
      Task.updateOne({_id: parent}, {$pull: {subtasks: {$in: [stid]}}}).exec(),
      Subtask.deleteOne({_id: stid}).exec()
    ]);


    res.status(200).json({message: 'deleted successfully'});

  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500,
      message: 'Failed Deleting Subtask'});
  }
};
