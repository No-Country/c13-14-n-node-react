const express = require('express')
const { validateToken } = require('../middlewares/auth.middleware')
const { createProfile, findProfile, deleteProfile, findPublicProfile } = require('../controllers/profile.controller')

const router = express.Router()

router.get('/public/:nameSpace', findPublicProfile)

router.post('/', validateToken, createProfile)
router.get('/:id', validateToken, findProfile)
router.delete('/:id', validateToken, deleteProfile)
module.exports = { profileRouter: router }
