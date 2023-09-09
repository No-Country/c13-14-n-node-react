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
const { validateUserService, loginUserService, authTokenService, registerService } = require('../services/auth.service');
const { resendValidationService } = require('../services/auth.service');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  try {
    const { email, password, profile } = req.body;
    const resul = await registerService(email, password, profile)
    res.status(201).json({ message:resul })
  } catch ({message}) {
    res.status(409).json({message})
  }
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
    try {
      const { email, password } = req.body;
      const session = await loginUserService( email, password)
      res.status(200).json(session)
    } catch ({ message }) {
      res.status(409).send({ message })
    }
});

const authToken = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  if (!token) return res.status(401).json({ message: 'INVALID_TOKEN' });
  try {
    const session = await authTokenService(token)
    return res.status(200).json(session)
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
    if(!email) return res.status(409).json('PARAMETER_ERROR')
    await resendValidationService( email )
    return res.status(200).json({message:'RESEND_EMAIL'})
  } catch ({ message }) {
    res.status(409).json({message})
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