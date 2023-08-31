import { useDispatch, useSelector } from 'react-redux'
import { setSession as setSessionSlice } from '../reducers/session.slice'
import { APP_KEY_TOKEN, APP_URL_ADMIN } from '../config/constants'
import { loginService, validateAuthService, validateUserService } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'

export default function useSession () {
  const session = useSelector(state => state.session)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const setSession = (session) => {
    const { token } = session
    dispatch(setSessionSlice(token ? session : null))
    token
      ? window.localStorage.setItem(APP_KEY_TOKEN, token)
      : window.localStorage.removeItem(APP_KEY_TOKEN)
    token && navigate(APP_URL_ADMIN)
  }

  const authToken = async (token) => {
    const session = await validateAuthService(token)
    session && setSession(session)
  }

  const validateUser = async (token) => {
    const session = await validateUserService(token)
    if (!session) return
    setSession(session)
  }

  const login = async (passport) => {
    const session = await loginService(passport)
    setSession(session)
    if (session) return true
  }

  const logout = () => setSession({})

  const hasSession = !!session

  return { session, login, logout, authToken, validateUser, hasSession }
}
