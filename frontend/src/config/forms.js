export const registerFields = [
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
    step: 1
  },
  {
    name: 'confirm',
    type: 'password',
    default: null,
    error: null,
    step: 1
  },
  {
    name: 'profile',
    type: 'text',
    default: null,
    error: null,
    step: 2
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
