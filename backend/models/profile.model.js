const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  nameSpace: {
    type: String,
    unique: true,
    required: false
  },
  title: {
    type: [String],
    required: false
  },
  header: {
    type: String,
  },
  image: {
    type: String,
    default: "default.jpg"
  },
  status: {
    type: Boolean,
    default: false,
    required: false
  },
  body: {
    type: String,
    required: false,
  },
  lastInitProfile: {
    default: false,
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  link: [{
    type: mongoose.Schema.ObjectId,
    ref: "Link"
  }],
  theme: {
    type: mongoose.Schema.ObjectId,
    ref: "Theme",
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
