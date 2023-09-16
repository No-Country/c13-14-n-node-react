// const { UserProfile } = require('../models/userProfile.model')
const { User } = require('../models/user.model')

const { createToken } = require('../libs/token')

const { findProfileService } = require('./profile.service')
const { findUserProfilesService } = require('./userProfiles.service')

const findSessionDataService = async (user) => {
  let profile

  const userProfiles = await findUserProfilesService({user:user.id})

  // Verifico que el usuario tenga acceso al perfil
  if (user?.profile) {
    const idProfile = user.profile.toString()
    const profileInUserProfiles = userProfiles.find(profile => profile.id === idProfile)
    if (!profileInUserProfiles) throw new Error('INVALID_PROFILE')
    profile = await findProfileService(idProfile)
  }

  // Creo nuevo token
  const userId = user._id.toString()
  const profileId = user?.profile.toString()
  const token = createToken({ userId, profileId })

  const userFormater = {
    id: user._id.toString(),
    name: user?.name,
    email: user.email,
    status: user.status,
    photo: user.photo
  }

  return {
    user: userFormater,
    userProfiles,
    profile,
    token
  }
}
// const findUserByEmailService = async (email) =>{
//   return await User.findOne( {email} )
// }

module.exports = { findSessionDataService }
