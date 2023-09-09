import { useDispatch, useSelector } from 'react-redux'
import { setSession as setSessionSlice } from '../reducers/session.slice'
import { APP_KEY_TOKEN, APP_URL_ADMIN } from '../config/constants'
import { loginService, validateAuthService, validateUserService } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { userChangePasswordService } from '../services/user.service'

import { setUser } from '../reducers/user.slice'
import { setProfile } from '../reducers/profile.slice'

import { loginService, loginFromTokenService, validateUserService, resendEmailService } from '../services/auth.service'

import useLoader from './useLoader'
import { APP_KEY_TOKEN, PROFILE_INICIAL_STATE, USER_INICIAL_STATE } from '../config/constants'

export default function useSession () {
  const user = useSelector(state => state.user)
  const { loaderOnOff } = useLoader()

  const dispatch = useDispatch()

  const setSession = ({ solved, payload }) => {
    dispatch(setUser(solved ? { ...payload.user, userProfiles: payload.userProfiles } : USER_INICIAL_STATE))
    dispatch(setProfile(solved ? { ...payload.profile, links: payload.links } : PROFILE_INICIAL_STATE))
  }

  const authToken = async (token) => {
    const res = await await handleService(loginFromTokenService, token)
    console.log(res)
    !res.solved && window.localStorage.removeItem(APP_KEY_TOKEN)
    return res
  }

  const validateUser = async (token) => await handleService(validateUserService, token)

  const resendEmail = async (email) => await handleService(resendEmailService, email)

  const login = async (passport) => {
    const res = await handleService(loginService, passport)
    res.solved && window.localStorage.setItem(APP_KEY_TOKEN, res.payload.token)
    return res
  }

  const handleService = async (service, param) => {
    loaderOnOff(true) // Muestra el loader
    const res = await service(param)
    setSession(res)
    loaderOnOff(false) // Oculta el loader
    return res
  }

  const changePassword = async (password, name, id) => {
    return await userChangePasswordService(password, name, id);
  }

  const logout = () => {
    window.localStorage.removeItem(APP_KEY_TOKEN)
    setSession({})
  }

  return { session, login, logout, authToken, validateUser }
}
