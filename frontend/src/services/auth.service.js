import axios from 'axios'
import { API_URL_REGISTER } from '../config/constants'

export const sendRegistrationData = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData)
    console.log(res)
    return res
  } catch (error) {
    //! FALTA MANEJO DE ERRORES
    console.log(error.messge)
  }
}
