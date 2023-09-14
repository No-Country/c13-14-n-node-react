import axios from 'axios'
import { API_URL_LOGIN, API_URL_REGISTER, API_URL_RESEND, API_URL_SESSION, API_URL_VALIDATE } from '../config/constants'
import { authTokenHeader } from '../libs/api'

const validateToken = async (url, token) => {
  try {
    const res = await axios.post(`${url}/${token}`)
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const loginService = async (passport) => {
  try {
    const res = await axios.post(API_URL_LOGIN, passport)
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const registerService = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData)
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}

export const validateUserService = async (token) => {
  return await validateToken(API_URL_VALIDATE, token)
}

export const loginFromTokenService = async (token) => {
  return await validateToken(API_URL_SESSION, token)
}

export const resendEmailService = async (email) => {
  try {
    const res = await axios.post(API_URL_RESEND, { email })
    return { solved: true, payload: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { solved: false, payload: message }
  }
}
