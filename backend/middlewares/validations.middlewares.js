const { check, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5, max: 10 })
    .withMessage('Password must be at least 5 and 10.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,10}$/)
    .withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),
  check('profile')
    .optional()
    .isLength({ min: 5, max: 15 })
    .isAlphanumeric()
];

const validateLinksErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }
  next();
}
const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

const changePasswordValidations = [
  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5, max: 10 })
    .withMessage('Password must be at least 5 and 10.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,10}$/)
]

module.exports = {
  createUserValidations,
  checkValidations,
  validateLinksErrors,
  changePasswordValidations
};