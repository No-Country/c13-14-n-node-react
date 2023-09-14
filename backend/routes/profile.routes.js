const express = require('express')
const { validateToken } = require('../middlewares/auth.middleware')
const { createProfile, findProfile } = require('../controllers/profile.controller')

const router = express.Router()

router.post('/', validateToken, createProfile)
router.get('/:id', validateToken, findProfile)

module.exports = { profileRouter: router }
