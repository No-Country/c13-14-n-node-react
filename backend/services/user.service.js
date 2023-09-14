const { UserProfile } = require('../models/userProfile.model')
const { createToken } = require('../libs/token')

const { findProfileService } = require('./profile.service')

const findSessionDataService = async (user) => {
  let profile

  // Busco todos los userProfile del usuario que tenga status = accepted
  let userProfiles = await UserProfile.find({ user: user.id, status: 'accepted' })
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
    status: user.status
  }

  return {
    user: userFormater,
    userProfiles,
    profile,
    token
  }
}

module.exports = { findSessionDataService }
