const mongoose = require('mongoose');
const { USER_STATUS } = require('../config/constants');
const { Profile } = require('./profile.model');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number, // 
    default: USER_STATUS.NO_VAIDATE, 
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Profile
  },

});

const User = mongoose.model('User', userSchema);

module.exports = { User };
