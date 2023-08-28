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

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const validate = await User.findOne({ email, name }) || null;

  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,254})+$/;

  const validPassword = /^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/;

  const validName = /^[a-zA-Z\s]{5,}$/;

  if(validate!==null){
    return res.status(409).json({ message: "User exist" });
  }

  if(!(validEmail.test(email))){
    return res.status(409).json({ message: "Email not Valid" });
  }

  if(!(validPassword.test(password))){
    return res.status(409).json({ message: "Password not Valid" });
  }

  if(!(validName.test(name))){
    return res.status(409).json({ message: "Name not Valid" });
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    status: false
  });

  const token = jwt.sign({id: newUser.name, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

  // Remove password from response
  newUser.password = undefined;

  const mailOptions = {
    from: process.env.MAIL_NODEMAILER,
    to: newUser.email,
    subject: 'Activa tu cuenta',
    text: `http://localhost:4000/api/v1/users/validateToken/${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });

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
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    email,
    status: true,
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

const validateTokenSession = catchAsync(async (req, res, next) =>{
  
  const token = req.params.token;
  
  if(!token){
    return res.status(401).json({ message: 'Token missing' }); // res.redirect(url);
  }

  try{

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodeToken);

    const validateUser = User.updateOne({ email: decodeToken.email }, {status: true})
    .then(()=>{

      const mailOptions = {
        from: process.env.MAIL_NODEMAILER,
        to: decodeToken.email,
        subject: `¡Bienvenido ${decodeToken.id}!`,
        text: `Su Cuenta fue activada con exito!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });

      res.status(200).json({message: 'Cuenta activada'})
    }) // res.redirect(url);
    .catch(error=>{
      console.log(error)
      res.status(404).json({message: 'Usuario no encontrado'})
    }) // res.redirect(url);
    
  } catch (error) {
    return res.status(401).json({message: 'Invalid token'}); // res.redirect(url);
  }

});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
  validateTokenSession,
};
