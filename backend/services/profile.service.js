// Models
const { Profile } = require('../models/profile.model')
const { UserProfile } = require('../models/userProfile.model')

// Services
const { linksProfileService } = require('./links.service')
const { findProfileUsersService } = require('./userProfiles.service')


const createProfileService = async (nameSpace, user) => {
  const existProfileName = await Profile.findOne({ nameSpace })
  if (existProfileName) throw new Error('INVALID_NAMESPACE')

  const newProfile = await Profile.create({ nameSpace })
  const profile = newProfile._id.toString()
  await UserProfile.create({ user, profile })

  return newProfile
}

const findProfileService = async (idProfile) => {
  const profile = await Profile.findById(idProfile)

  if (!profile) throw new Error('PROFILE_NOT_FOUND')

  // Busco los links del perfil
  const links = await linksProfileService(idProfile)

  const profileUsers = await findProfileUsersService({ profile: idProfile })
 
  const profileFormater = {
    id: profile._id.toString(),
    nameSpace: profile.nameSpace,
    body: profile.body,
    status: profile.status,
    links,
    profileUsers
  }
console.log(profileFormater)
  return profileFormater
}

module.exports = { createProfileService, findProfileService }
