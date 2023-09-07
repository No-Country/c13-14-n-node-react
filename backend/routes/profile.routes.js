const express = require('express');

const { protectToken } = require('../middlewares/users.middlewares');

const {
    createProfile,
    findAllProfile,
    deleteProfile,
    updateProfile,
} = require('../controllers/profile.controller');



const router = express.Router();
//router.use(protectToken);

router.post('/', createProfile);
router.put('/:id', updateProfile);
router.get('/:id', findAllProfile);
router.delete('/delete/:id', deleteProfile);

module.exports = { profileRouter: router };