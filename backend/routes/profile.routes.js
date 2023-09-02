const express = require('express');


const {
    createProfile,
} = require('../controllers/profile.controller');
const { protectToken } = require('../middlewares/users.middlewares');

const router = express.Router();
//router.use(protectToken);

router.post('/create', createProfile);

module.exports = { profileRouter: router };