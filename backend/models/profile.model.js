const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    nameSpace: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        default: false,
        required: true
      },
      body: {
        type: String,
        required: false,
      },
      themeProfileId: {
        type: Object,
        require: false
      },
      lastInitProfile: {
        type: Boolean,
        require: false
      }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
