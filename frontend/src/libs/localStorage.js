import { APP_KEY_LANGUAGE, APP_KEY_TOKEN, DEFAULT_LANGUAGE, USER_INICIAL_STATE } from '../config/constants'
import { loginFromTokenService } from '../services/auth.service'

export const localSession = async () => {
  const token = window.localStorage.getItem(APP_KEY_TOKEN)
  if (!token) return USER_INICIAL_STATE
  const session = await loginFromTokenService(token)
  return session || USER_INICIAL_STATE
}

export const locaLanguage = () => {
  return window.localStorage.getItem(APP_KEY_LANGUAGE) || DEFAULT_LANGUAGE
}
