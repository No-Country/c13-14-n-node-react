const express = require('express');
const { checkValidations } = require('express-validator');

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
  validateTokenSession,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUser);

router.post('/login', login);

router.get('/validateToken/:token', validateTokenSession);

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
