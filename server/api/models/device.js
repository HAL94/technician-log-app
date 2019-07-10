const mongoose = require('mongoose');

const defaultConfig = {
  type: String,
  required: true
}

const deviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    deviceName: {type: String, required: true},
    deviceType: {type: String, required: true},
    deviceSn: {type: String, required: true},
    description: String
}, {timestamps: true});

module.exports = mongoose.model('Device', deviceSchema);
