const express = require('express');

const subtaskController = require('../../controllers/dashboard/subtask');

const router = express.Router();

router.delete('/delete/:stid', subtaskController.delete_subtask);

router.patch('/edit/:stid', subtaskController.edit_subtask);

module.exports = router;
