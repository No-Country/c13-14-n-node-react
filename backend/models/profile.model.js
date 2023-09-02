const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  nameSpace: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  header: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  body: {
    type: String,
    required: true,
  },
  lastInitProfile: {
    default: false,
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  themeId: {
    type: mongoose.Schema.ObjectId,
    ref: "Theme",
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
