import { validateEmail, validateName, validatePassword, validateConfirm } from '../validations/form.auth'

export const formRegisterFields = [
  {
    name: 'email',
    type: 'email',
    validate: validateEmail,
    error: null,
    isValid: false,
    value: null,
    step: 1
  },
  {
    name: 'name',
    type: 'text',
    validate: validateName,
    error: null,
    isValid: false,
    value: null,
    step: 1
  },
  {
    name: 'password',
    type: 'password',
    validate: validatePassword,
    error: null,
    isValid: false,
    value: null,
    step: 2
  },
  {
    name: 'confirm',
    type: 'password',
    validate: validateConfirm,
    error: null,
    isValid: false,
    value: null,
    step: 2
  }
]
