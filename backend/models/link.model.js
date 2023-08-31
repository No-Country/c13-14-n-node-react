const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  idProfile: {
    type: String,
    required: true,
  },
  urlEnlace: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = { Link };
