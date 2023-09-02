const express = require('express');


const {
    createTheme
} = require('../controllers/theme.controller');

const router = express.Router();

router.post('/', createTheme);

module.exports = { themeRouter: router };

