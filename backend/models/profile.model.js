const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    nameSpace: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        required: true
      },
      body: {
        type: String,
        required: true,
      },
    //   status: {
    //     type: Boolean,
    //     default: true,
    //   },
      create_at: {
        type: Date,
        default: Date.now ,
      },
      themeProfield: {
        type: String,
        default: true,
      },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };
