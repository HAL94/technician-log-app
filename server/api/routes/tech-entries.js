const express = require('express');
const router = express.Router();

const TechentriesController = require('../controllers/tech-entries');

router.get('/api', TechentriesController.get_all_techentries);

router.get('/api/todaysentries', TechentriesController.get_todays_entries);

router.get('/api/:techentryId', TechentriesController.get_techentry);

router.post('/api', TechentriesController.create_techentry_api);

router.put('/api/:techentryId', TechentriesController.edit_techentry);

router.delete('/api/:techentryId', TechentriesController.delete_entry);

module.exports = router;
