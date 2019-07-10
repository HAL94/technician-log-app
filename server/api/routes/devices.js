const express = require('express');
//sub package the express framework ships with which
//give different capabilities to handle differnet routes,
//reaching different end points
const router = express.Router();

const DeviceController = require('../controllers/devices');
//sub urls

router.get('/', DeviceController.get_all_devices);

router.get('/:deviceId', DeviceController.get_device);

router.post('/', DeviceController.create_device);

router.patch('/:deviceId', DeviceController.edit_device);

router.delete('/:deviceId', DeviceController.delete_device);

module.exports = router;
