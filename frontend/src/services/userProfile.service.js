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
export const deleteUserManagerService = async (profileUserId, profileUserEmail) => {
  try {
    const headers = authTokenHeader()
    const data = {
      profileUserId: profileUserId,
      profileUserEmail: profileUserEmail
    }

    // En lugar de enviar los datos como query parameters, envíalos en el cuerpo (body) de la solicitud
    const res = await axios.delete(API_URL_USERPROFILES, {
      headers,
      data
    })

    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
