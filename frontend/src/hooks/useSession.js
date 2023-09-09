import { useDispatch, useSelector } from 'react-redux'
import { setSession as setSessionSlice } from '../reducers/session.slice'
import { APP_KEY_TOKEN, APP_URL_ADMIN } from '../config/constants'
import { loginService, validateAuthService, validateUserService } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { userChangePasswordService } from '../services/user.service'

export default function useSession () {
  const session = useSelector(state => state.session)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const setSession = (session) => {
    console.log(session)
    const { token } = session
    dispatch(setSessionSlice(session))
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
    return !!session
  }

  const changePassword = async (password, name, id) => {
    return await userChangePasswordService(password, name, id);
  }

  const logout = () => setSession({})

  return { session, login, logout, authToken, validateUser, changePassword }
}
