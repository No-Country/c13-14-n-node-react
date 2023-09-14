const express = require('express')
const { validateToken } = require('../middlewares/auth.middleware')
const { createProfile, findProfile, deleteProfile } = require('../controllers/profile.controller')

const router = express.Router()

router.post('/', validateToken, createProfile)
router.get('/:id', validateToken, findProfile)
router.delete('/:id', validateToken, deleteProfile)
module.exports = { profileRouter: router }
