import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../reducers/user.slice'
import { setProfile } from '../reducers/profile.slice'

import { loginService, loginFromTokenService, validateUserService, resendEmailService, registerService } from '../services/auth.service'

import useLoader from './useLoader'
import { APP_KEY_TOKEN, PROFILE_INICIAL_STATE, USER_INICIAL_STATE, INICIAL_SOCIAL_ICONS } from '../config/constants'

export default function useSession () {
  const user = useSelector(state => state.user)
  const { handleService } = useLoader()

  const dispatch = useDispatch()

  const setSession = ({ solved, payload }) => {
    dispatch(setUser(solved ? { ...payload.user, userProfiles: payload.userProfiles } : USER_INICIAL_STATE))
    const social = payload.profile.social || INICIAL_SOCIAL_ICONS
    dispatch(setProfile(solved ? { ...payload.profile, social } : PROFILE_INICIAL_STATE))
  }

  const authToken = async (token) => {
    const res = await handleService(loginFromTokenService, token)
    setSession(res)
    !res.solved && window.localStorage.removeItem(APP_KEY_TOKEN)
    return res
  }

  const register = async (data) => {
    return await handleService(registerService, data)
  }

  const validateUser = async (token) => await handleService(validateUserService, token)

  const resendEmail = async (email) => await handleService(resendEmailService, email)

  const login = async (passport) => {
    const res = await handleService(loginService, passport)
    setSession(res)
    res.solved && window.localStorage.setItem(APP_KEY_TOKEN, res.payload.token)
    return res
  }

  const logout = () => {
    window.localStorage.removeItem(APP_KEY_TOKEN)
    setSession({})
  }

  const changePassword = async (password, email) => {
    // return await handleService(changePasswordService, password, email)
  }

  return { user, login, logout, authToken, validateUser, setSession, resendEmail, changePassword, register }
}
