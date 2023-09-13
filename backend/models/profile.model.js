const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  nameSpace: {
    type: String,
    unique: true,
    required: false
  },
  body: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: true,
    required: false
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = { Profile }
