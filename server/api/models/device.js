const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceName: String,
    deviceType: String,
    deviceSn: String
});

module.exports = mongoose.model('Device', deviceSchema);