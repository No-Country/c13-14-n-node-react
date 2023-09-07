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
