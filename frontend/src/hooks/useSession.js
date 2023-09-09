import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../reducers/user.slice'
import { setProfile } from '../reducers/profile.slice'

import { loginService, loginFromTokenService, validateUserService, resendEmailService } from '../services/auth.service'

import useLoader from './useLoader'
import { PROFILE_INICIAL_STATE, USER_INICIAL_STATE } from '../config/constants'

export default function useSession () {
  const user = useSelector(state => state.user)
  const { loaderOnOff } = useLoader()

  const dispatch = useDispatch()

  const setSession = ({ status, data }) => {
    dispatch(setUser(status ? data.user : USER_INICIAL_STATE))
    dispatch(setProfile(status ? data.profile : PROFILE_INICIAL_STATE))
  }

  const authToken = async (token) => await handleApi(loginFromTokenService, token)

  const validateUser = async (token) => await handleApi(validateUserService, token)

  const resendEmail = async (email) => await handleApi(resendEmailService, email)

  const login = async (passport) => await handleApi(loginService, passport)

  const handleApi = async (cb, param) => {
    loaderOnOff(true)
    const res = await cb(param)
    setSession(res)
    loaderOnOff(false)
    return res
  }

  const logout = () => setSession({})

  return { user, login, logout, authToken, validateUser, setSession, resendEmail }
}
