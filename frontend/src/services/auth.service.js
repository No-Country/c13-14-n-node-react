import axios from 'axios'
import { API_URL_LOGIN, API_URL_REGISTER, API_URL_SESSION, API_URL_VALIDATE } from '../config/constants'

const validateToken = async (url, token) => {
  try {
    const res = await axios.post(`${url}/${token}`)
    return res.data
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.messge)
    return {}
  }
}

export const loginService = async (passport) => {
  try {
    const { data } = await axios.post(API_URL_LOGIN, passport)
    return data
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.messge)
    return {}
  }
}

export const sendRegistrationData = async (formData) => {
  try {
    const { data } = await axios.post(API_URL_REGISTER, formData)
    return data
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.messge)
    return false
  }
}

export const validateUserService = async (token) => {
  return await validateToken(API_URL_VALIDATE, token)
}

export const validateAuthService = async (token) => {
  return await validateToken(API_URL_SESSION, token)
}
