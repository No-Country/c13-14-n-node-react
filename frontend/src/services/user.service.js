import axios from 'axios'
import { API_URL_CHANGE_PASSWORD, API_URL_USERS } from '../config/constants'
import { authTokenHeader } from '../libs/api'

export const updatedUserDataService = async (data) => {
  try {
    const formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('name', data.name);
    formData.append('photoName', data.photoName);
    const headers = authTokenHeader()
    const res = await axios.post(API_URL_USERS, formData, { headers,'Content-Type': 'multipart/form-data' })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const changePasswordService = async (password) => {
    try {
      const headers = authTokenHeader();
      console.log(headers)
      const res = await axios.post(API_URL_CHANGE_PASSWORD, { password }, { headers })
    } catch (error) {
      const message = error?.response?.data?.message || 'SERVER_ERROR'
      console.log(error)
      return { solved: false, payload: message }
    }
  }