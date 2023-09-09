import axios from 'axios'
import { API_URL_LOGIN, API_URL_REGISTER, API_URL_RESEND, API_URL_SESSION, API_URL_VALIDATE } from '../config/constants'

const validateToken = async (url, token) => {
  try {
    const res = await axios.post(`${url}/${token}`)
    return res.data
  } catch (error) {
    const message = error?.response?.data?.message
    return message || 'SERVER_ERROR'
  }
}

export const loginService = async (passport) => {
  try {
    const res = await axios.post(API_URL_LOGIN, passport)
    return { status: true, data: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { status: false, data: message }
  }
}

export const registerService = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData)
    return { status: true, data: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { status: false, data: message }
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
    return { status: true, data: res.data }
  } catch (error) {
    const message = error?.response?.data?.message || 'SERVER_ERROR'
    return { status: false, data: message }
  }
}
