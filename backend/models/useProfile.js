const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    profileId: {
        type: mongoose.Schema.ObjectId,
        ref: "Profile",
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = { UserProfile };