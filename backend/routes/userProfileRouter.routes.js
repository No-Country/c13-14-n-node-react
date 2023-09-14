const express = require('express');
const { validateToken } = require('../middlewares/auth.middleware');


const {
    createUserProfile
} = require('../controllers/userProfile.controller');

const router = express.Router();

router.post('/', validateToken, createUserProfile);

module.exports = { userProfileRouter: router };

