const express = require('express');

//sub package the express framework ships with which 
//give different capabilities to handle differnet routes,
//reaching different end points
const router = express.Router();

//sub urls 

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET request for entries'
    })
});

router.get('/:entryId', (req, res, next) => {
   
});

router.post('/', (req, res, next) => {
    const entry = {
        name: req.body.entryName,
        deviceName: req.body.deviceName,
        deviceType: req.body.deviceType
    };
    res.status(201).json({
        message: 'handling POST request for entries',
        entry: entry
    })
});

router.patch('/:entryId', (req, res, next) => {
    res.status(200).json({
        message: 'handling PATCH request for an entry'
    })
});

router.delete('/:entryId', (req, res, next) => {
    res.status(200).json({
        message: 'handling DELETE request for an entry'
    })
});

module.exports = router;
