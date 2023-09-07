const bcrypt = require('bcryptjs');

const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { Link } = require('../models/link.model');
const { UserProfile } = require('../models/userProfile.model');
const { USER_STATUS } = require('../config/constants');
const { createToken, validToken } = require('../libs/token');
const { sendRegisterNotification, sendWelcomeMessage } = require('./email.service');
const { findSessionDataService } = require('./user.service');

const loginUserService = async ({ email, password }) =>{
  let profile
  let links
  const user = await User.findOne({email })

  // User validations
  if (!user) return res.status(401).json({ message: "USER_NOT_FOUND" })
  if (user.status !== USER_STATUS.VALIDATE) return res.status(401).json({ message: "USER_NOT_VALIDATE" })
  if (!(await bcrypt.compare(password, user.password)))return res.status(401).json({ message: "INVALID_PASSWORD" })

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

const resendValidationService = async ({ email }) =>{
  const user = await User.findOne({ email })
  if(!user?.email) throw new Error('USER_NOT_FOUND')
  if(user.status !== USER_STATUS.NO_VAIDATE) throw new Error('USER_VALIDATE')
  const idUser = user._id.toString()
  sendRegisterNotification({ idUser, email })
  return true
}

const registerService = (body)=>{

}

const authTokenService = async (token)=>{
  const session = validToken(token)
  console.log(session)
  if(!session) throw new Error('IVALID_TOKEN')
  const { userId } = session
  const user = User.findById(userId)
  if(!user) throw new Error('IVALID_TOKEN')
  return findSessionDataService(user)
}


module.exports = { validateUserService , resendValidationService, loginUserService, registerService, authTokenService }