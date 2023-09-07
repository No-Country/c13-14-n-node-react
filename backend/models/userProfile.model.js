const mongoose = require('mongoose');
const { User } = require('./user.model');
const { Profile } = require('./profile.model');

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Profile
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