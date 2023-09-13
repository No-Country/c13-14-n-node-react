// Utils
const { catchAsync } = require('../utils/catchAsync')

// models
const { Profile } = require('../models/profile.model')

// Services
const { createProfileService, findProfileService } = require('../services/profile.service')
const { createToken } = require('../libs/token')

// Crear un nuevo link
const createProfile = catchAsync(async (req, res, next) => {
  const { nameSpace } = req.body
  try {
    const { userId } = req.headers.session
    const newProfile = await createProfileService(nameSpace, userId)
    const id = newProfile._id.toString()
    res.status(201).send({ id })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})

const findProfile = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    //! Debo buscar en userProfiles
    const { userId } = req.headers.session
    const profile = await findProfileService(id)
    const token = createToken({ userId, profileId: profile.id })
    res.status(200).send({ profile, token })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})

const findAllProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const allProfile = await Profile.find({ user: id }).populate('user link theme') || null

  if (allProfile === null) {
    return res.status(409).json({ message: 'no tienes perfiles.' })
  }

  res.status(200).json({
    message: 'success',
    profile: allProfile
  })
})

module.exports = {
  createProfile,
  findProfile,
  findAllProfile
}
