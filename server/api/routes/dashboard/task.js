const express = require('express');

const taskController = require('../../controllers/dashboard/task');

const router = express.Router();

router.get('/', taskController.get_tasks);

router.get('/get/:taskId', taskController.get_task);

router.delete('/delete/:taskId', taskController.delete_task);

router.post('/add', taskController.add_task);

router.patch('/edit/:taskId', taskController.edit_task);

module.exports = router;
