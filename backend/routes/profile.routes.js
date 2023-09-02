const express = require('express');

const { protectToken } = require('../middlewares/users.middlewares');

const {
    createProfile, findAllProfile,
} = require('../controllers/profile.controller');


const router = express.Router();
//router.use(protectToken);

router.post('/', createProfile);
router.get('/:id', findAllProfile);

module.exports = { profileRouter: router };