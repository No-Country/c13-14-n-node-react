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
    return res.data
  } catch (error) {

  }
}

export const deleteLinkService = async (_id) => {
  try {
    const res = await axios.delete(`${API_URL_LINKS}/${_id}`, { headers })
    console.log(_id)
    return res.data
  } catch (error) {

  }
}

export const uddateLinkService = async (_id, updatedLink) => {
  try {
    const response = await axios.patch(`${API_URL_LINKS}/${_id}`, updatedLink)

    if (response.status === 200) {
      console.log('Enlace actualizado con éxito:', response.data)
      return response.data
    } else {
      console.error('Error al actualizar el enlace:', response.status, response.statusText)
      throw new Error('Error al actualizar el enlace')
    }
  } catch (error) {
    console.error('Error al actualizar el enlace:', error)
    throw error
  }
}

export const toggleLinkStatusService = async (_id, updatedLink) => {
  try {
    const response = await axios.patch(`${API_URL_LINKS}/${_id}`, updatedLink)

    if (response.status === 200) {
      console.log('Enlace actualizado con éxito:', response.data)
      return response.data
    } else {
      console.error('Error al actualizar el enlace:', response.status, response.statusText)
      throw new Error('Error al actualizar el enlace')
    }
  } catch (error) {
    console.error('Error al actualizar el enlace:', error)
    throw error
  }
}
