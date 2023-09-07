export const DEFAULT_LANGUAGE = 'es'

// Local storage keys
export const APP_KEY_LANGUAGE = 'APP_KEY_LANGUAGE'
export const APP_KEY_TOKEN = 'APP_KEY_TOKEN'

// Keys del estadoglobal
export const KEY_LOADER = 'loader'

// Config API_URLS
const API_URL_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api/v1'

export const API_URL_LOGIN = API_URL_BASE + '/users/login'
export const API_URL_REGISTER = API_URL_BASE + '/users'
export const API_URL_SESSION = API_URL_BASE + '/users/auth'
export const API_URL_VALIDATE = API_URL_BASE + '/users/validate'

export const APP_URL_LANDING = '/'
export const APP_URL_LOGIN = '/login'
export const APP_URL_REGISTER = '/register'
export const APP_URL_VALIDATE = '/validate'
export const APP_URL_ADMIN = '/admin'
export const APP_URL_ACCOUNT = '/admin/account'

// URLS PROFILES
export const APP_URL_PROFILE = API_URL_BASE + '/profile'
export const APP_URL_PROFILE_DELETE = API_URL_BASE + '/profile/delete'
