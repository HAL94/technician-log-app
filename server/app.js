const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const entriesRoutes = require('./api/routes/entries');
const devicesRoutes = require('./api/routes/devices');

mongoose.connect('mongodb://'+ process.env.mongodburl + ':27017/' + process.env.dbname,
 {useNewUrlParser: true}).then(
     () => {console.log('connected to local db');},
     (error) => {console.log(error)}
 );

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
        'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({ });
    } 

    next();
})

app.use('/entries', entriesRoutes);
app.use('/devices', devicesRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = app;
