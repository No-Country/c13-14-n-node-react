import axios from 'axios'
import { API_URL_USERPROFILES } from '../config/constants'
import { authTokenHeader } from '../libs/api'

export const createUserManagerService = async (email) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.post(API_URL_USERPROFILES, { email }, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
export const deleteUserManagerService = async (id) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.delete(API_URL_USERPROFILES, { id }, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
