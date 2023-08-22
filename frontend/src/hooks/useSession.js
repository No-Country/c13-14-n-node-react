import { useDispatch, useSelector } from 'react-redux'
import { setSession, unsetSession } from '../reducers/session.slice'
import { APP_SESSION } from '../config/constants'

export default function useSession () {
  const { email, fullName } = useSelector(state => state.session)

  const dispatch = useDispatch()

  const login = (passport, save = true) => {
    dispatch(setSession(passport))
    save && saveSession(passport)
  }

  const logout = () => {
    dispatch(unsetSession())
    saveSession('')
  }

  const saveSession = (passport) => {
    const stringPassport = JSON.stringify(passport)
    window.localStorage.setItem(APP_SESSION, stringPassport)
  }

  const hasLogged = !!email

  return { fullName, email, login, logout, hasLogged }
}
