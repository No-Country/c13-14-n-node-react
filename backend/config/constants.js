
const APP_FRONT_URL =  process.env.APP_FRONT_URL || 'http://localhost:5173'

const APP_FRONT_URL_VALIDATE = APP_FRONT_URL + '/validate'

const USER_STATUS = {
  NO_VAIDATE: 0,
  VALIDATE:1
}

module.exports  = {
  APP_FRONT_URL_VALIDATE,
  USER_STATUS
}