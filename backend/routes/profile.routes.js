const express = require('express');

const { protectToken } = require('../middlewares/users.middlewares');

const {
    createProfile,
} = require('../controllers/profile.controller');


const router = express.Router();
//router.use(protectToken);

router.post('/', createProfile);

module.exports = { profileRouter: router };