const bcrypt = require('bcryptjs');

const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { Link } = require('../models/link.model');
const { UserProfile } = require('../models/userProfile.model');
const { USER_STATUS } = require('../config/constants');
const { createToken, validToken } = require('../libs/token');
const { sendRegisterNotification, sendWelcomeMessage } = require('./email.service');
const { findSessionDataService } = require('./user.service');

const loginUserService = async ( email, password ) =>{
  let profile
  let links
  const user = await User.findOne({email })

  // User validations
  if (!user) throw new Error("USER_NOT_FOUND")
  if (user.status !== USER_STATUS.VALIDATE) throw new Error("USER_NOT_VALIDATE")
  if (!(await bcrypt.compare(password, user.password))) throw new Error("INVALID_PASSWORD")

  return await findSessionDataService(user)
}

const validateUserService = async (token) =>{
    const session = validToken(token)
    if(!session?.email) throw new Error('IVALID_TOKEN')
    const { email } = session
    const user = await User.findOneAndUpdate({email},{status:USER_STATUS.VALIDATE})
    if(!user) throw new Error('INVALID_TOKEN')
    return await findSessionDataService(user)
}

const resendValidationService = async ( email ) =>{
  const user = await User.findOne({ email })
  if(!user?.email) throw new Error('USER_NOT_FOUND')
  if(user.status !== USER_STATUS.NO_VAIDATE) throw new Error('USER_VALIDATE')
  const idUser = user._id.toString()
  sendRegisterNotification({ idUser, email })
}

const registerService = async (email, password, profile)=>{
    
    // Verify email pre-existence
    const user = await User.findOne({email})
    if(user) throw new Error('USER_EXIST')
  

    // Verify pre-existence of the profile
    if(profile){
      const existingProfile = await Profile.findOne({nameSpace:profile})
      if(existingProfile) throw new Error('PROFIE_EXIST')
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    // Create profile and userProfile
    if(profile){
        const newProfile = await Profile.create({nameSpace:profile})
        // Default profile
        newUser.profile = newProfile._id
        newUser.save()
        const newUserProfile = {user:newUser._id, profile:newProfile._id, status:'accepted'}
        await UserProfile.create(newUserProfile)
    }

    // Send email notification
    sendRegisterNotification({email})

    return true
}

const authTokenService = async (token)=>{
  const session = validToken(token)
  if(!session) throw new Error('IVALID_TOKEN')
  const { userId } = session
  const user = await User.findById(userId)
  if(!user) throw new Error('IVALID_TOKEN')
  return findSessionDataService(user)
}


module.exports = { validateUserService , resendValidationService, loginUserService, registerService, authTokenService }