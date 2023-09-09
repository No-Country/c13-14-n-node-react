import axios from 'axios'
import { API_URL_CHANGEPASSWORD } from '../config/constants'
import { headers } from '../libs/api'

export const userChangePasswordService = async (password, name, id) => {
    try {
      console.log(`${API_URL_CHANGEPASSWORD}${id}`)
      console.log(headers)
        const res = await axios.patch(`${API_URL_CHANGEPASSWORD}${id}`, {password, name}, { headers })
        return res.data
      } catch (error) {
        console.log(error)
      }
}