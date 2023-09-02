const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  nameSpace: {
    type: String,
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
    require: true
  },
  themeId: {
    type: mongoose.Schema.ObjectId,
    ref: "Theme",
    require: true
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
