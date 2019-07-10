const express = require('express');
const router = express.Router();

const taskRoutes = require('./task');
const subtaskRoutes = require('./subtask');

const dashboardController = require('../../controllers/dashboard/dashboard');

router.get('', dashboardController.get_dashboard);
// router.post('', dashboardController.set_dashboard);

router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);

module.exports = router;
