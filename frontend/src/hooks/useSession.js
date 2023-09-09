import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../reducers/user.slice'
import { setProfile } from '../reducers/profile.slice'

import { loginService, loginFromTokenService, validateUserService, resendEmailService } from '../services/auth.service'

import useLoader from './useLoader'
import { APP_KEY_TOKEN, PROFILE_INICIAL_STATE, USER_INICIAL_STATE } from '../config/constants'

export default function useSession () {
  const user = useSelector(state => state.user)
  const { loaderOnOff } = useLoader()

  const dispatch = useDispatch()

  const setSession = ({ status, data }) => {
    dispatch(setUser(status ? { ...data.user, userProfiles: data.userProfiles } : USER_INICIAL_STATE))
    dispatch(setProfile(status ? { ...data.profile, links: data.links } : PROFILE_INICIAL_STATE))
  }

  const authToken = async (token) => {
    const res = await await handleService(loginFromTokenService, token)
    console.log(res)
    !res.status && window.localStorage.removeItem(APP_KEY_TOKEN)
    return res
  }

  const validateUser = async (token) => await handleService(validateUserService, token)

  const resendEmail = async (email) => await handleService(resendEmailService, email)

  const login = async (passport) => {
    const res = await handleService(loginService, passport)
    res.status && window.localStorage.setItem(APP_KEY_TOKEN, res.data.token)
    return res
  }

  const handleService = async (service, param) => {
    loaderOnOff(true) // Muestra el loader
    const res = await service(param)
    setSession(res)
    loaderOnOff(false) // Oculta el loader
    return res
  }

  const logout = () => {
    window.localStorage.removeItem(APP_KEY_TOKEN)
    setSession({})
  }

  return { user, login, logout, authToken, validateUser, setSession, resendEmail }
}
