const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  badgeNumber: {type: String, required: true},
  birthDate: {type: Date},
  address: {type: String},
  city: {type: String},
  country: {type: String},
  postalCode: {type: String},
  aboutUser: {type: String},
  profileImage: {type: String}
}, {timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
