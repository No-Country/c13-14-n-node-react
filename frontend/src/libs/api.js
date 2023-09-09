import { APP_KEY_TOKEN } from '../config/constants'

export const authTokenHeader = () => {
  return { Authorization: `Bearer ${window.localStorage.getItem(APP_KEY_TOKEN)}` }
}
