const { Types } = require('mongoose')
const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { UserProfile } = require('../models/userProfile.model');
const { createToken } = require('../libs/token');
const { Link } = require('../models/link.model');

const findSessionDataService = async (user)=>{
  let profile
  let links
  const userProfiles = await UserProfile.find({user: user.id })
    .populate({
      path: 'profile',
      select: 'nameSpace rol'
    })

  if(user?.profile) {
    profile = await Profile.findById(user.profile)
    links = await Link.find({ profile:user.profile })
  }

  const userId = user._id.toString()
  const profileId = profile?._id.toString()
  const token = createToken({userId, profileId})

  return { 
    user, 
    userProfiles, 
    profile:{...profile.toJSON(), links}, 
    token
  }
}


module.exports = { findSessionDataService}