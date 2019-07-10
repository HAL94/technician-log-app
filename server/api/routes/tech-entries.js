const express = require('express');
const router = express.Router();

const TechentriesController = require('../controllers/tech-entries');

router.get('/', TechentriesController.get_all_techentries_api);

router.get('/:techentryId', TechentriesController.get_techentry_api);

router.post('/', TechentriesController.create_techentry_api);

router.patch('/:techentryId', TechentriesController.edit_techentry_api);

router.delete('/:techentryId', TechentriesController.delete_entry_api);

module.exports = router;
