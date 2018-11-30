const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Device = require('../models/device');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET request for devices'
    })
    
});

router.get('/:deviceId', (req, res, next) => {
    const deviceId = req.params.deviceId;
    Product.findById(deviceId)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                message: 'handling GET request for a device',
                device: doc
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                err: error
            });
        });
    
});

router.post('/', (req, res, next) => {
    const device = new Device({
        _id: new mongoose.Types.ObjectId(),
        deviceName: req.body.deviceName,
        deviceType: req.body.deviceType,
        deviceSn: req.body.deviceSn
    });
    device.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handling POST request for devices',
                device: device
            });        
        }).catch(error => {
            console.log(error)
        });
    
    
});

router.delete('/:deviceId', (req, res, next) => {
    res.status(200).json({
        message: 'handling DELETE request for a device',
        deviceId: req.params.deviceId
    }) 
});

module.exports = router;