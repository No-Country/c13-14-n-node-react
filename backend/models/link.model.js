const mongoose = require('mongoose')
const { Profile } = require('./profile.model')

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Profile
  },
  urlEnlace: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
})

const Link = mongoose.model('Link', linkSchema)

module.exports = { Link }
