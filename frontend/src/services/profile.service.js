import axios from 'axios'
import { API_URL_PROFILES, API_URL_PUBLIC_PROFILE } from '../config/constants'
import { authTokenHeader } from '../libs/api'

export const createProfileService = async (nameSpace) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.post(API_URL_PROFILES, { nameSpace }, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const loadProfileService = async (id) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.get(`${API_URL_PROFILES}/${id}`, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const deleteProfilefileService = async (id) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.delete(`${API_URL_PROFILES}/${id}`, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const updateProfileService = async (newData) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.put(API_URL_PROFILES, newData, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const findPublicProfileService = async (nameSpace) => {
  try {
    const res = await axios.get(`${API_URL_PUBLIC_PROFILE}/${nameSpace}`)
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
