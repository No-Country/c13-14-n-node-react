const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    backgroundTheme: { // imagen de fondo
        type: String,
        unique: true,
        required: true
    },
    backgroundLink: { // color de fondo links
        type: String,
        unique: true,
        required: true
    }
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = { Theme };