import axios from 'axios'
import { API_URL_LOGIN, API_URL_REGISTER, API_URL_SESSION, API_URL_VALIDATE } from '../config/constants'

const validateToken = async (url, token) => {
  try {
    console.log(`${url}/${token}`)
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
    const res = await axios.post(API_URL_LOGIN, passport)
    const { user, token } = res.data
    const { name, email, _id } = user
    const session = { user: { id: _id, name, email }, token }
    return session
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.message)
    return {}
  }
}

export const registerService = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData)
    return res.data
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.message)
    return false
  }
}

export const validateUserService = async (token) => {
  return await validateToken(API_URL_VALIDATE, token)
}

export const validateAuthService = async (token) => {
  return await validateToken(API_URL_SESSION, token)
}
