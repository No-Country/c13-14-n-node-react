import { useDispatch, useSelector } from 'react-redux'
import { setSession as setSessionSlice } from '../reducers/session.slice'
import { setProfile } from '../reducers/profile.slice'
import { setLinks } from '../reducers/links.slice'
import { APP_KEY_TOKEN, APP_URL_ADMIN } from '../config/constants'
import { loginService, validateAuthService, validateUserService } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import useLoader from './useLoader'


export default function useSession() {
  const session = useSelector(state => state.session)
  const navigate = useNavigate()
  const { loaderOnOff } = useLoader()

  const dispatch = useDispatch()

  const setSession = ({ user, userProfiles, profile, token }) => {
    user.userProfiles = userProfiles
    dispatch(setSessionSlice(user))
    dispatch(setProfile(profile))
    token
      ? window.localStorage.setItem(APP_KEY_TOKEN, token)
      : window.localStorage.removeItem(APP_KEY_TOKEN)
    token && navigate(APP_URL_ADMIN)
  }

  const authToken = async (token) => {
    loaderOnOff(true)
    const session = await validateAuthService(token)
    session && setSession(session)
    loaderOnOff(false)
  }

  const validateUser = async (token) => {
    loaderOnOff(true)
    const session = await validateUserService(token)
    if (!session) return false
    setSession(session)
    loaderOnOff(false)
    return true
  }

  const login = async (passport) => {
    loaderOnOff(true)
    const session = await loginService(passport)
    setSession(session)
    loaderOnOff(false)
    return !!session
  }

  const logout = () => setSession({})

  return { session, login, logout, authToken, validateUser }
}
