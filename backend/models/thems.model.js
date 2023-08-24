const mongoose = require('mongoose');

const themSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    premium: {
        type: Boolean,
        require: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };