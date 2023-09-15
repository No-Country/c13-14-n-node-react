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
 
  const formattedProfile = {...formatProfile(profile), links, profileUsers }

  return formattedProfile
}

const findNameSpaceProfileService = async (nameSpace) =>{
  const profile = await Profile.findOne({nameSpace})

  if (!profile) throw new Error('PROFILE_NOT_FOUND')

  // Busco los links del perfil
  const idProfile = profile._id.toString()
  const links = await linksProfileService(idProfile)

  const formattedProfile = {...formatProfile(profile), links }

  return formattedProfile
}

const updateProfileService = async (idProfile, newData) =>{
  const profile = await Profile.findOneAndUpdate({_id:idProfile},newData)
  console.log(idProfile, profile)
  if(!profile) throw new Error('INVALID_TOKEN')
  return formatProfile(profile)
}

const formatProfile = (profile) =>{
  const idProfile = profile._id.toString()
  return {
    id: idProfile,
    nameSpace: profile.nameSpace,
    body: profile.body,
    social: profile.social,
    status: profile.status
  }
}



module.exports = { 
  createProfileService,
  findProfileService,
  findNameSpaceProfileService,
  updateProfileService 
}
