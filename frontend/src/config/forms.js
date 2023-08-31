export const registerStepOne = [
  {
    name: 'email',
    type: 'email'
  },
  {
    name: 'password',
    type: 'password'
  },
  {
    name: 'confirm',
    type: 'password'
  }
]

export const loginFields = [
  {
    name: 'email',
    type: 'email',
    require: true,
    default: null,
    step: 1
  },
  {
    name: 'password',
    type: 'password',
    default: null,
    error: null,
    step: 2
  }
]
