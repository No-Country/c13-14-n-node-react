import Validator from '../libs/classValidator'

export const validateEmail = (value) => {
  const validate = new Validator(value)
  validate.isEmail()
  return validate.isValidated() ? null : 'invalidEmail'
}

export const validateName = (value) => {
  const validate = new Validator(value)
  validate.notContainSymbols()
  validate.notSpaces()
  return validate.isValidated() ? null : 'invalidName'
}

export const validatePassword = (value) => {
  const validate = new Validator(value)
  validate.isLongMin(4)
  validate.isLongMax(10)
  validate.isContainNumbers()
  validate.isContainsLetters()
  return validate.isValidated() ? null : 'invalidPassword'
}

export const validateConfirm = (confirm, password) => {
  return password === confirm ? '' : 'invalidConfirm'
}
