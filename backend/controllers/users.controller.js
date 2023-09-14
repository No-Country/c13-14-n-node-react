const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.MAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER
  }
})

// require('crypto').randomBytes(64).toString('hex')

// Models 
const { User } = require('../models/user.model')
const { Profile } = require('../models/profile.model')
const { UserProfile } = require('../models/userProfile.model')

// Utils
const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')
const { USER_STATUS } = require('../config/constants')
const { sendRegisterNotification } = require('../services/email.service')
const { validateUserService, loginUserService, authTokenService, registerService } = require('../services/auth.service')
const { resendValidationService } = require('../services/auth.service')

dotenv.config({ path: './config.env' })

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    users
  })
})

const createUser = catchAsync(async (req, res, next) => {
  try {
    const { email, password, profile } = req.body
    const resul = await registerService(email, password, profile)
    res.status(201).json({ message: resul })
  } catch ({ message }) {
    res.status(409).json({ message })
  }
})

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req

  res.status(200).json({
    user
  })
})

const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.headers.session
  const { name, photoName } = req.body;
  
  if (req.files) {
    const photo = req.files.photo;
    photo.mv(`C:/Users/zhark/Desktop/unilinkk/c13-14-n-node-react/backend/uploads/images/${photoName}`, function(err) {
      if (err)
        return res.status(500).send(err);
    });
    if(name){
      try{
        await User.updateOne({_id: userId}, { name, photo: photoName});
        res.status(200).json({ status: 'success_photo_name' });
      }catch(error){
        res.status(200).json({status: 'Fail'})
      }
    }else {
      res.status(200).json({ status: 'success_photo' });
    }
  }else if (name) {
    try {
      await User.updateOne({ _id: userId }, { name });
      res.status(200).json({ status: 'success' });
    } catch (error) {
      res.status(500).json({ status: 'Fail' });
    }
  } else {
    // Manejar el caso en el que no se proporcionaron ni una foto ni un nombre
    res.status(400).json({ status: 'Fail', message: 'Ninguna foto ni nombre proporcionados.' });
  }
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.updateOne({ status: false })

  res.status(200).json({
    status: 'success'
  })
})

const login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body
    const session = await loginUserService(email, password)
    console.log(session)
    res.status(200).json(session)
  } catch ({ message }) {
    res.status(409).send({ message })
  }
})

const authToken = catchAsync(async (req, res, next) => {
  const { token } = req.params
  if (!token) return res.status(401).json({ message: 'INVALID_TOKEN' })
  try {
    const session = await authTokenService(token)
    console.log(session)
    return res.status(200).json(session)
  } catch (error) {
    return res.status(401).json({ message: 'INVALID_TOKEN' }) // res.redirect(url);
  }
})

const validateUser = catchAsync(async (req, res, next) => {
  const { token } = req.params
  if (!token) return res.status(401).json({ message: 'INVALID_TOKEN' })
  try {
    const session = await validateUserService(token)
    return res.status(200).json({ session })
  } catch (error) {
    return res.status(401).json({ message: 'INVALID_TOKEN' }) // res.redirect(url);
  }
})

const resendValidationEmail = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) return res.status(409).json('PARAMETER_ERROR')
    await resendValidationService(email)
    return res.status(200).json({ message: 'RESEND_EMAIL' })
  } catch ({ message }) {
    res.status(409).json({ message })
  }
})

const changeUserPassword = catchAsync(async (req, res, next) => {
  const { userId } = req.headers.session
  const { password } = req.body;
  try{
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.updateOne({ _id: userId }, { password: hashPassword });
    return res.status(200).json({message:'contraseña cambiada'})
  }catch (error) {
    return res.status(404).json({message:'Usuario No Encontrado'})
  }

});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  authToken,
  validateUser,
  resendValidationEmail,
  changeUserPassword
}
