// Utils
const { catchAsync } = require('../utils/catchAsync')

// models
const { Profile } = require('../models/profile.model')

// Services
const { createUserProfileService } = require('../services/userProfiles.service')

const createUserProfile = catchAsync(async (req, res, next) => {
  const { email } = req.body
  console.log(email)
  try {
    const { profileId } = req.headers.session
    const newUserProfile = await createUserProfileService(email, profileId)
    const id = newUserProfile._id.toString()
    res.status(201).send({ id })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})

module.exports = {
    createUserProfile
}
