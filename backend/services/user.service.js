const { Types } = require('mongoose')
const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { UserProfile } = require('../models/userProfile.model');
const { createToken } = require('../libs/token');
const { Link } = require('../models/link.model');

const findSessionDataService = async (user)=>{
  let profile
  let links

  // Busco todos los userProfile del usuario que tenga status = accepted
  let userProfiles = await UserProfile.find({user: user.id , status: 'accepted'})
    .populate({
      path: 'profile',
      select: 'nameSpace rol status'
    }).lean()

  // Le doy formato de salida
  userProfiles = userProfiles.map(item => {
    return {
      id : item.profile._id.toString(),
      nameSpace: item.profile.nameSpace,
      rol: item.rol,
      status: item.status,
    }
  })

  console.log(userProfiles)

  if(user?.profile) {
    profile = await Profile.findById(user.profile)
    links = await Link.find({ profile:user.profile }).select('')
  }

  const userId = user._id.toString()
  const profileId = profile?._id.toString()
  const token = createToken({userId, profileId})

  const userFormater = {
    id: user._id.toString(),
    name: user?.name,
    email: user.email,
    status: user.status,
  }

  const profileFormater = {
    id: profile._id.toString(),
    nameSpace: profile.nameSpace,
    body: profile.body,
    status: profile.status,
  }

  return { 
    user: userFormater, 
    userProfiles, 
    profile:profileFormater, 
    links,
    token
  }
}


module.exports = { findSessionDataService}