const { User } = require('../models/user.model');
const { USER_STATUS } = require('../config/constants');
const { createToken, validToken } = require('../libs/token');
const { sendRegisterNotification } = require('./email.service');


const validateUserService = async (token) =>{
    const session = validToken(token)
    const { email } = session
    const user = await User.findOneAndUpdate({email},{status:USER_STATUS.VALIDATE})

    if(!user) throw new Error('INVALID_TOKEN')

    // await user.populate('userProfiles.idUser').execPopulate();
    const newToken = createToken({email})
    return {user, token:newToken}
}

const resendValidationService = async ({email}) =>{
  const user = await User.findOne({email})
  if(!user?.email) throw new Error('USER_NOT_FOUND')
  if(user.status !== USER_STATUS.NO_VAIDATE) throw new Error('USER_VALIDATE')

  sendRegisterNotification(email)
  return true
}


module.exports = { validateUserService , resendValidationService}