const mongoose = require ('mongoose')
const { User } = require('../models/user.model')

const { UserProfile } = require('../models/userProfile.model')
// const { findUserByEmailService } = require('./user.service')

const findUserProfilesService = async (query) => {

  let userProfiles = await UserProfile.find(query)
    .populate({
      path: 'profile',
      select: 'nameSpace rol status'
    }).lean()

  // Le doy formato de salida
  userProfiles = userProfiles.map(item => {
    return {
      id: item.profile._id.toString(),
      nameSpace: item.profile.nameSpace,
      rol: item.rol,
      status: item.status
    }
  })
  return userProfiles
}

const findProfileUsersService = async (query) => {

  let profileUsers = await UserProfile.find(query)
    .populate({
      path: 'user',
      select: 'email'
    }).lean()

  // Le doy formato de salida
  profileUsers = profileUsers.map(item => {
    return {
      id: item.profile._id.toString(),
      email: item.user.email,
      rol: item.rol,
      status: item.status
    }
  })
  return profileUsers
}

const createUserProfileService = async (email, profileId) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  // Utiliza el operador 'new' para crear un ObjectId
  const idProfile = new mongoose.Types.ObjectId(profileId)

  const newUserProfile = await UserProfile.create({
    user: user._id,
    profile: idProfile,
    rol: 'manager',
    status: 'pending'
  })
  return newUserProfile
}

module.exports = { findUserProfilesService, findProfileUsersService, createUserProfileService }
