const mongoose = require('mongoose');

const defaultConfig = {
  type: String,
  required: true
}

const deviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    deviceName: defaultConfig,
    deviceType: defaultConfig,
    deviceSn: defaultConfig,
    description: String
}, {timestamps: true});

module.exports = mongoose.model('Device', deviceSchema);
