const express = require('express');
const { validateToken } = require('../middlewares/auth.middleware');


const {
    createUserProfile,
    deleteUserProfile
} = require('../controllers/userProfile.controller');

const router = express.Router();

router.post('/', validateToken, createUserProfile);

router.delete('/', validateToken, deleteUserProfile)

module.exports = { userProfileRouter: router };

