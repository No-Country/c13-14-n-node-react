const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    backgroundTheme: { // imagen de fondo
        type: String,
        required: true
    },
    backgroundLink: { // color de fondo links
        type: String,
        required: true
    }
});

const User = mongoose.model('Theme', themeSchema);

module.exports = { User };