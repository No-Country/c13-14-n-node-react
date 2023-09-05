const mongoose = require('mongoose');
const { USER_STATUS } = require('../config/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
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
  lastSelectedIDProfile: {
    type: mongoose.Schema.Types.ObjectId,
  },

});

const User = mongoose.model('User', userSchema);

module.exports = { User };
