import axios from 'axios'
import { API_URL_LINKS } from '../config/constants'
import { headers } from '../libs/api'

export const getLinksService = async () => {
  try {
    const res = await axios.get(API_URL_LINKS, { headers })
    return res.data
  } catch (error) {

  }
}

export const createLinkService = async (newLink) => {
  try {
    const res = await axios.post(API_URL_LINKS, newLink, { headers })
    return res.status === 201
  } catch (error) {
    return false
  }
}

export const updateLinkService = async (_id, updatedLink) => {
  try {
    const response = await axios.patch(`${API_URL_LINKS}/${_id}`, updatedLink, { headers })
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const deleteLinkService = async (_id) => {
  try {
    const res = await axios.delete(`${API_URL_LINKS}/${_id}`, { headers })
    return res.status === 200
  } catch (error) {
    return false
  }
}
