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
        required: true,
      },
      themeProfileId: {
        type: Object,
        require: true
      },
      lastInitProfile: {
        type: Boolean,
        require: true
      }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
