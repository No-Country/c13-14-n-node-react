const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.MAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER
  }
});



// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { UserProfile } = require('../models/userProfile.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { USER_STATUS } = require('../config/constants');
const { sendRegisterNotification } = require('../services/email.service');
const { validateUserService, loginUserService, authTokenService } = require('../services/auth.service');
const { resendValidationService } = require('../services/auth.service');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {

  const { email, password, profile } = req.body;

  const validate = await User.findOne({ email }) || null;

  if (validate !== null) {
    return res.status(409).json({ message: "User exist" });
  }

  // Verify pre-existence of the profile
  if(profile){
    const validateProfile = await Profile.findOne({nameSpace:profile})
    if(validateProfile) return res.status(409).json({ message: "PROFILE_EXIST" });
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
      console.log(newUserProfile)
      await UserProfile.create(newUserProfile)
  }

   // Se resuelve en servicio
  // const token = jwt.sign({ id: newUser.name, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  // Remove password from response
  newUser.password = undefined;

  // Send email notification
  sendRegisterNotification({email})
  
  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, password, email } = req.body;

  await user.updateOne({ name, password, email });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.updateOne({ status: false });

  res.status(200).json({
    status: 'success',
  });
});

const login = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    const session = await loginUserService({ email, password })
    res.json(session)

});

const authToken = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  if (!token) return res.status(401).json({ message: 'INVALID_TOKEN' });
  try {
    const session = await authTokenService(token)
    return res.status(200).json({session})
  } catch (error) {
    return res.status(401).json({ message: 'INVALID_TOKEN' }); // res.redirect(url);
  }
});

const validateUser = catchAsync(async (req, res, next)  => {
  const { token } = req.params;
  if (!token) return res.status(401).json({ message: 'INVALID_TOKEN' });
  try {
    const session = await validateUserService(token)
    return res.status(200).json({session})
  } catch (error) {
    return res.status(401).json({ message: 'INVALID_TOKEN' }); // res.redirect(url);
  }
});

const resendValidationEmail = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body
    await resendValidationService({ email })
    return res.send(200).json({message:'RESEND_EMAIL'})
  } catch ({message}) {
    res.status(401).json({message})
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
  resendValidationEmail
};