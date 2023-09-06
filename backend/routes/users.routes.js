const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
  resendValidationEmail,
  validateUser,
} = require('../controllers/users.controller');

const { createUserValidations, checkValidations } = require('../middlewares/validations.middlewares');

const router = express.Router();

//Register
router.post('/', createUserValidations, checkValidations, createUser);

//Login
router.post('/login', login);

//Validate
router.post('/validate/:token', validateUser )

// Re-send email
router.post('/resend', resendValidationEmail);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllUsers);

router.get('/check-token', checkToken);


router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };