const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: mongoose.Schema.ObjectId,
    ref: "Profile",
    required: true,
  },
  urlEnlace: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  order: {
    type: Number,
    required: true,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = { Link };
