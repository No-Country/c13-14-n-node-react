import axios from 'axios'
import { API_URL_LINKS } from '../config/constants'
import { authTokenHeader } from '../libs/api'

export const createLinkService = async (newLink) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.post(API_URL_LINKS, newLink, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const updateLinkService = async (link) => {
  try {
    const headers = authTokenHeader()
    const id = link._id
    const res = await axios.patch(`${API_URL_LINKS}/${id}`, link, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const deleteLinkService = async (_id) => {
  try {
    const headers = authTokenHeader()
    const res = await axios.delete(`${API_URL_LINKS}/${_id}`, { headers })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
