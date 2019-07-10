const mongoose = require('mongoose');
const Device = require('../models/device');

exports.get_all_devices = (req, res, next) => {
  Device.find()
    .exec()
    .then(devices => {
      res.status(200).json({
        fetchedEntries: devices.map(device => {
          return formatDevice(device);
        })
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.get_device = (req, res, next) => {
  console.log(req.params);
  const id = req.params.deviceId;
  Device.findById(id)
    .exec()
    .then(device => {
      res.status(200).json({
        device: formatDevice(device)
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
};

exports.create_device =  (req, res, next) => {
  const device = new Device({
    _id: new mongoose.Types.ObjectId(),
    deviceId: new mongoose.Types.ObjectId(),
    deviceName: req.body.deviceName,
    deviceType: req.body.deviceType,
    deviceSn: req.body.deviceSn,
    description: req.body.description
  });

  device.save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}

exports.edit_device = (req, res, next) => {
  const operationOps = {};
  const id = req.params.deviceId;
  for (const ops of req.body)
  {
    operationOps[ops.propName] = ops.value;
  }
  Device.update({_id: id}, {$set: operationOps})
    .exec()
    .then(result => {
      res.status(200).json({
        updatedDevice: result
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};

exports.delete_device = (req, res, next) => {
  const id = req.params.deviceId;
  Device.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: result
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
};


function formatDevice(device) {
  return {
    deviceId: device._id,
    deviceName: device.deviceName,
    deviceType: device.deviceType,
    deviceSn: device.deviceSn,
    description: device.description
  };
}
