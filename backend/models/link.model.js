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
    type: String, //Por definir
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
