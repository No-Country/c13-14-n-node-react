import axios from 'axios'
import { API_URL_LINKS } from '../config/constants'
import { headers } from '../libs/api'

export const createLinkService = async (newLink) => {
  try {
    const res = await axios.post(API_URL_LINKS, newLink, { headers })
    return res.data
  } catch (error) {

  }
}

export const deleteLinkService = async (id) => {
  try {
    const res = await axios.delete(API_URL_LINKS, id, { headers })
    return res.data
  } catch (error) {

  }
}

export const uddateLinkService = async (id, updatedLink) => {
  try {
    const res = await axios.patch(API_URL_LINKS, id, updatedLink, { headers })
    return res.data
  } catch (error) {

  }
}

export const toggleLinkStatus = async (id, updatedLink) => {
  try {
    const res = await axios.patch(API_URL_LINKS, id, updatedLink, { headers })
    return res.data
  } catch (error) {

  }
}
