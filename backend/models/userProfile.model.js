const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  idProfile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rol: {
    type: String,
    enum: ['owner', 'manager'],
    default: 'owner',
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted', 'pending'],
    default: 'accepted',
    default: false,
    required: true,
  },

});

const UserProfile = mongoose.model('UserProfile', userSchema);

module.exports = { UserProfile };
