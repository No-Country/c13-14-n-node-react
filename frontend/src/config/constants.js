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
export const API_URL_RESEND = API_URL_BASE + '/users/resend'
export const API_URL_VALIDATE = API_URL_BASE + '/users/validate'
export const API_URL_LINKS = API_URL_BASE + '/links'
export const API_URL_CHANGE_PASSWORD = API_URL_BASE + '/users/changePassword'
export const API_URL_USERS = API_URL_BASE + '/users/updateUser'

export const API_URL_PROFILES = API_URL_BASE + '/profile'
export const API_URL_PUBLIC_PROFILE = API_URL_PROFILES + '/public'

export const API_URL_PHOTOS = API_URL_BASE + '/uploads/images'
export const API_URL_USERPROFILES = API_URL_BASE + '/userprofile'

// APP RUTES
export const APP_URL_LANDING = '/'
export const APP_URL_LOGIN = '/login'
export const APP_URL_REGISTER = '/register'
export const APP_URL_VALIDATE = '/validate'
export const APP_URL_ADMIN = '/admin'
export const APP_URL_ACCOUNT = '/admin/account'

export const SOCIAL_ICONS_URLS = {
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/in/',
  youtube: 'https://www.youtube.com/c/',
  twitch: 'https://twitch.tv/',
  tiktok: 'https://www.tiktok.com/@'
}

// InicialStates
export const USER_INICIAL_STATE = {
  id: null,
  name: null,
  email: null,
  photo: null,
  userProfiles: []
}

export const INICIAL_SOCIAL_ICONS = {
  instagram: '',
  facebook: '',
  twitter: '',
  tiktok: ''
}

export const PROFILE_INICIAL_STATE = {
  id: null,
  nameSpace: null,
  title: null,
  photo: null,
  body: null,
  delegateTo: [],
  social: INICIAL_SOCIAL_ICONS,
  links: []
}

export const LINK_INICIAL_STATE = { name: '', urlEnlace: '' }
