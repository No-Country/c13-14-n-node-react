import { APP_KEY_TOKEN } from '../config/constants'

const token = window.localStorage.getItem(APP_KEY_TOKEN);

export const headers = { Authorization: `Bearer ${token}` }
